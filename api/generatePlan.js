import 'dotenv/config'; // Loads .env file variables for local testing

// --- THIS IS THE FULL JSON SCHEMA WE WILL ASK THE AI TO FOLLOW ---
// We define it here so we can include it in the prompt.
// NEW: Added "googleMapsQuery"
const aiResponseSchemaText = `{
    "type": "OBJECT",
    "properties": {
        "planTitle": { "type": "STRING" },
        "planDates": { "type": "STRING" },
        "atAGlance": {
            "type": "OBJECT",
            "properties": {
                "weatherVibe": { "type": "STRING" },
                "dosAndDonts": {
                    "type": "ARRAY",
                    "items": { "type": "OBJECT", "properties": { "isDo": { "type": "BOOLEAN" }, "text": { "type": "STRING" } } }
                }
            }
        },
        "dailyItinerary": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "day": { "type": "STRING" },
                    "focus": { "type": "STRING" },
                    "routeSummary": { "type": "STRING" },
                    "timelineItems": {
                        "type": "ARRAY",
                        "items": {
                            "type": "OBJECT",
                            "properties": {
                                "time": { "type": "STRING" },
                                "title": { "type": "STRING" },
                                "description": { "type": "STRING" },
                                "googleMapsQuery": { "type": "STRING" },
                                "isFoodiePick": { "type": "BOOLEAN" },
                                "tags": { "type": "ARRAY", "items": { "type": "STRING" } },
                                "walkingDistance": { "type": "STRING" },
                                "transportDetails": { "type": "STRING" },
                                "estimatedCost": { "type": "STRING" }
                            }
                        }
                    }
                }
            }
        },
        "packingList": {
            "type": "OBJECT",
            "properties": {
                "clothing": { "type": "ARRAY", "items": { "type": "STRING" } },
                "essentials": { "type": "ARRAY", "items": { "type": "STRING" } },
                "other": { "type": "ARRAY", "items": { "type": "STRING" } }
            }
        },
        "foodGuide": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "name": { "type": "STRING" },
                    "type": { "type": "STRING" },
                    "description": { "type": "STRING" },
                    "estimatedPrice": { "type": "STRING" }
                }
            }
        }
    }
}`;


// This helper function builds the prompt from all the form data.
function buildMegaprompt(formData) {
    // --- Helper functions to make the prompt smarter ---
    function buildFamilyPrompt(data) {
        if (data.travelWith !== 'family') return '';
        return `
    * **Family Details:**
        * Child-Friendly Activities: ${data.childActivities ? 'Yes, prioritize these.' : 'Not a priority.'}
        * Special Requests: ${data.childSpecialRequests || 'None.'}`;
    }

    function buildBudgetPrompt(data) {
        if (data.budget === 'custom' && data.customBudgetAmount) {
            return `Custom: Approx. $${data.customBudgetAmount} USD per day.`;
        }
        return data.budget;
    }

    function buildMobilityPrompt(mobility) {
        if (mobility === 'low') return 'Accessible (Prefers taxis, low walking, accessible routes)';
        if (mobility === 'medium') return 'Moderate Pace (Up to 10,000 steps per day)';
        if (mobility === 'high') return 'Walk All Day (15,000+ steps is great)';
        return 'Not specified.';
    }

    function buildStartTimePrompt(startTime) {
        if (startTime === 'early') return 'Early Bird (Start day at 8 AM)';
        if (startTime === 'normal') return 'Average Riser (Start day around 9-10 AM)';
        if (startTime === 'late') return 'Sleeper (Start day 11 AM or later)';
        return 'Not specified.';
    }

    function buildEndTimePrompt(endTime) {
        if (endTime === 'early') return 'Early Night (End day by 9 PM)';
        if (endTime === 'normal') return 'Night Owl (End day by 11 PM)';
        if (endTime === 'late') return 'All-Nighter (End day after 1 AM)';
        return 'Not specified.';
    }

    function buildStructurePrompt(structure) {
        if (structure === 'full') return 'Full Schedule (Detailed 9 AM - 9 PM plan)';
        if (structure === 'flexible') return 'Flexible Plan (Key activities + free time)';
        if (structure === 'suggestions') return "Just Suggestions (A list of 'pins' to choose from)";
        return 'Not specified.';
    }

    function buildSubInterestPrompt(data) {
        let prompt = '';
        if (data.subInterestsFood && data.subInterestsFood.length > 0) {
            prompt += `\n    * **Foodie Sub-Interests:** ${data.subInterestsFood.join(', ')}`;
        }
        if (data.subInterestsCulture && data.subInterestsCulture.length > 0) {
            prompt += `\n    * **Culture Sub-Interests:** ${data.subInterestsCulture.join(', ')}`;
        }
        return prompt;
    }

    // --- Main Prompt Assembly ---
    let prompt = `You are 'Vivid', a world-class AI travel concierge. Your expertise is in creating hyper-personalized, authentic, and logistically sound travel plans.

Your ENTIRE response MUST be a single, valid JSON object. Do NOT include any text, markdown formatting, or "json" tags before or after the JSON.
You must respond in the language with this code: ${formData.lang || 'en'}.
Generate a complete, multi-day travel plan based on the following user data.

---
### USER TRIP DATA
---

**Core Logistics:**
* **Destination:** ${formData.destination}
* **Dates:** ${formData.startDate} to ${formData.endDate}
* **Accommodation:** ${formData.accommodation} (This is the user's "Home Base" for all routes)
* **Arrival Time:** ${formData.arrivalTime || 'Not specified. Assume a full first day.'}
* **Departure Time:** ${formData.departureTime || 'Not specified. Assume a full last day.'}

**Traveler Profile:**
* **Companions:** ${formData.travelWith}
${buildFamilyPrompt(formData)}
* **Special Occasion:** ${formData.occasion ? 'Yes, this is for a special occasion.' : 'No.'}
* **Daily Budget:** ${buildBudgetPrompt(formData)}
* **Mobility:** ${buildMobilityPrompt(formData.mobility)}

**Daily Rhythm:**
* **Daily Start Time:** ${buildStartTimePrompt(formData.startTime)}
* **Daily End Time:** ${buildEndTimePrompt(formData.endTime)} 
* **Plan Structure:** ${buildStructurePrompt(formData.structure)}

**Interests & Preferences:**
* **Main Interests:** ${formData.interests ? formData.interests.join(', ') : 'None specified.'}
${buildSubInterestPrompt(formData)}
* **Must-Do:** ${formData.mustDo || 'None specified.'}
* **Avoid:** ${formData.avoid || 'None specified.'}
* **Dietary Needs:** ${formData.diet ? formData.diet.join(', ') : 'None specified.'}

---
### CRITICAL INSTRUCTIONS
---
You MUST use your Google Search tool to find hyper-specific, real-world information. "Inventing" details is forbidden.

1.  **TRANSPORT:**
    * **BAD:** "Take public transport to Taksim."
    * **GOOD:** "From your hotel in Kağıthane, walk 5 minutes to the 'Kağıthane Park' bus stop. Take bus **48N** (direction Taksim). Get off at the 'Taksim' stop (approx. 8 stops, 25 mins)."
    * **ACTION:** You MUST search for and use actual bus, tram, or metro line numbers and real stop names.
2.  **COSTS:**
    * **BAD:** "A bus ticket is cheap."
    * **GOOD:** "The bus fare is approx. **40 TL** (you must use an IstanbulKart)."
    * **ACTION:** You MUST search for and provide real, estimated costs for transport, tickets, and meals in the local currency.
3.  **RESTAURANTS:**
    * **BAD:** "Find a local restaurant for meatballs."
    * **GOOD:** "Go to **'Tarihi Sultanahmet Köftecisi Selim Usta'**. It's a 2-min walk from the Blue Mosque."
    * **ACTION:** You MUST search for and recommend specific, real restaurant names that match the user's budget and diet.
4.  **DIRECTIONS:**
    * **BAD:** "Walk to Istiklal Caddesi."
    * **GOOD:** "From Taksim Square, walk 2 minutes south to the start of Istiklal Caddesi."
    * **ACTION:** Provide clear, simple walking directions (e.g., "Walk 5 minutes...", "It's a 2km walk...") between stops.
5.  **NEW: MAPS QUERY:**
    * **ACTION:** For *every* timeline item, you MUST provide a "googleMapsQuery" field. This must be a clean, URL-friendly search query for the location (e.g., "Tarihi Sultanahmet Koftecisi Selim Usta, Istanbul" or "Hagia Sophia, Istanbul, Turkey").

---
### REQUIRED JSON FORMAT
---
Your entire response must be a single JSON object matching this schema. Do not add any other text.
${aiResponseSchemaText}
`;
    return prompt;
}

// --- The Vercel Handler Function ---
export default async function handler(request, response) {
    if (request.method !== 'POST') {
        console.warn(`[405] Method Not Allowed: ${request.method}`);
        return response.status(405).json({ error: 'Method Not Allowed' });
    }
    
    console.log("[API] Received POST request. Processing...");

    try {
        const formData = request.body;
        if (!formData || !formData.destination) {
            console.error("[400] Bad Request: No form data received.");
            return response.status(400).json({ error: 'Bad Request: No data received.' });
        }

        const finalPrompt = buildMegaprompt(formData);
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("[500] API Key Error: GEMINI_API_KEY is not set.");
            return response.status(500).json({ error: 'Internal Server Error: API Key not configured.' });
        }
        
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

        console.log("[API] Calling Google Gemini API with Google Search enabled...");
        
        // --- UPDATED PAYLOAD ---
        // We have ADDED the "tools" key and REMOVED "responseMimeType" and "responseSchema".
        // The prompt itself now contains the JSON schema instructions.
        const payload = {
            contents: [{
                parts: [{ text: finalPrompt }]
            }],
            tools: [{
                "google_search": {}
            }],
            generationConfig: {
                // We cannot use JSON mode + Tools, so we rely on the prompt
        // and our string cleaning logic.
        temperature: 0.7, 
        topK: 1,
        topP: 1,
        // --- THIS IS THE FIX ---
        // Increased token limit to allow for longer, more detailed plans.
        maxOutputTokens: 16384,
    }
};

        const apiResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const apiResponseData = await apiResponse.json();

        if (!apiResponse.ok) {
            console.error('[500] Google AI API Error:', apiResponseData);
            return response.status(500).json({ 
                error: 'Error from Google AI API.', 
                details: apiResponseData.error ? apiResponseData.error.message : 'Unknown API error.'
            });
        }

        let generatedText = apiResponseData?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!generatedText) {
            console.error('[500] Invalid response structure from AI:', apiResponseData);
            return response.status(500).json({ error: 'Invalid response from AI' });
        }

        // --- FIX: CLEAN THE JSON ---
        // This is now CRITICAL because we are not in JSON-only mode.
        const jsonStartIndex = generatedText.indexOf('{');
        const jsonEndIndex = generatedText.lastIndexOf('}');
        
        if (jsonStartIndex === -1 || jsonEndIndex === -1) {
            console.error('[500] AI response did not contain valid JSON:', generatedText);
            return response.status(500).json({ error: 'AI response was not valid JSON.' });
        }

        const cleanJsonString = generatedText.substring(jsonStartIndex, jsonEndIndex + 1);
        
        try {
            JSON.parse(cleanJsonString);
        } catch (parseError) {
            console.error('[500] Failed to parse cleaned JSON:', parseError.message);
            console.error('--- Original Text ---', generatedText);
            console.error('--- Cleaned Text ---', cleanJsonString);
            return response.status(500).json({ error: 'Failed to parse AI JSON response.' });
        }
        // --- END OF FIX ---

        console.log("[API] Successfully generated and cleaned JSON. Sending 200 OK.");
        return response.status(200).json({ planJSON: cleanJsonString });

    } catch (error) {
        console.error('[500] Uncaught error in generatePlan function:', error);
        return response.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

