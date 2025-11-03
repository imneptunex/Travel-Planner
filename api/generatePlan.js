import 'dotenv/config'; // Loads .env file variables for local testing

// This helper function builds the prompt from all the form data.
// It's the "brain" that translates your form into a request for the AI.
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

Your ENTIRE response MUST be a single, valid JSON object. Do NOT include any text before or after the JSON.
You must respond in the language with this code: ${formData.lang || 'en'}.
Generate a complete, multi-day travel plan based on the following user data.

---
### USER TRIP DATA
---

**Core Logistics:**
* **Destination:** ${formData.destination}
* **Dates:** ${formData.startDate} to ${formData.endDate}
* **Accommodation:** ${formData.accommodation}
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
### INSTRUCTIONS
---
Generate a JSON object matching the schema I provide. Be detailed and specific. Use the user's accommodation as the start/end point for daily routes. Acknowledge their arrival/departure times.
Create a "routeSummary" for each day.
Create "walkingDistance" strings (e.g., "Walk 5 min (300m)") between timeline items that are close.
If an item is a "Foodie" pick, set "isFoodiePick" to true.
`;
    return prompt;
}

const aiResponseSchema = {
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
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "isDo": { "type": "BOOLEAN" },
                            "text": { "type": "STRING" }
                        }
                    }
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
                                "isFoodiePick": { "type": "BOOLEAN" },
                                "tags": { "type": "ARRAY", "items": { "type": "STRING" } },
                                "walkingDistance": { "type": "STRING" }
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
                    "description": { "type": "STRING" }
                }
            }
        }
    }
};


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

        console.log("[API] Calling Google Gemini API...");
        
        // --- UPDATED PAYLOAD ---
        // We now tell the AI to *only* respond with JSON matching our schema
        const payload = {
            contents: [{
                parts: [{ text: finalPrompt }]
            }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: aiResponseSchema,
                temperature: 0.8,
                topK: 1,
                topP: 1,
                maxOutputTokens: 8192,
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

        // --- NEW FIX: CLEAN THE JSON ---
        // This finds the first "{" and the last "}" to extract the
        // JSON object, in case the AI wraps it in text or markdown.
        const jsonStartIndex = generatedText.indexOf('{');
        const jsonEndIndex = generatedText.lastIndexOf('}');
        
        if (jsonStartIndex === -1 || jsonEndIndex === -1) {
            console.error('[500] AI response did not contain valid JSON:', generatedText);
            return response.status(500).json({ error: 'AI response was not valid JSON.' });
        }

        // Extract the clean JSON string
        const cleanJsonString = generatedText.substring(jsonStartIndex, jsonEndIndex + 1);
        
        // Let's test if it's valid JSON before sending
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
        // Send the *clean* JSON string to the frontend
        return response.status(200).json({ planJSON: cleanJsonString });

    } catch (error) {
        console.error('[500] Uncaught error in generatePlan function:', error);
        return response.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

