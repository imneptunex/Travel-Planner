**Neptune: The AI Travel Planner ✈️**

Neptune is a "smart" travel itinerary generator that moves beyond generic lists. It uses Google Gemini, powered by Google Search, to build a complete, hyper-personalized, and actionable travel plan based on a conversational, multi-step user form.

This app understands your unique travel style—from your budget and mobility needs to your specific culinary interests—and generates a plan that includes real bus routes, actual restaurant names, estimated costs, and dynamic daily route maps.

This project is built using a modern "serverless" stack with a pure HTML/CSS/JS frontend and a Node.js backend running on Vercel.

**✨ Key Features**

**Conversational Multi-Step Form: **A beautiful, responsive 4-step form that asks for detailed user preferences in a natural, conversational way.

**Hyper-Personalization: **The AI considers:
**
Travel Companions:** (Solo, Partner, Friends, Family)

**Dynamic "Child" Options:** A special section appears if the user selects "Family."

**Budget:** (Backpacker, Standard, Premium, or a custom amount).

**Mobility: **(Accessible, Moderate, or High-Activity).

**Daily Rhythm:** (Start/End times and preferred plan structure).

**Dynamic Sub-Interests: **Checking "Foodie" or "Culture" reveals deeper, more specific options.

**Real-Time Data (The "Brain"):** The backend uses Google Gemini enabled with Google Search (tools) to find real, up-to-date information. It does not invent details.

**Actionable Itinerary:** **The AI is instructed to find:**

Real transport routes (e.g., "Take bus 48N from 'Kağıthane Park' stop...").

Real restaurant names that match the user's diet and budget.

Real-time estimated costs (in local currency) for transport, food, and tickets.

**Structured JSON Output:** The AI returns a clean, reliable JSON object, not just a blob of Markdown text.

**Dynamic Map Generation:** The frontend dynamically builds interactive Google Maps for each day's plan, showing the complete route with all the stops.

**Multi-Language Support:** The UI and AI response are fully translated (EN/TR) using a clean translations.js file and localStorage.

**🚀 Tech Stack**
**
Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)

**Maps: **Google Maps Embed API & Google Maps Directions API

**Backend:** Vercel Serverless Functions (Node.js)

**AI:** Google Gemini (gemini-2.5-flash-preview-09-2025)

**Grounding:** Google Search (via Gemini tools)

**Deployment:** Vercel

**Local Dev:** Vercel CLI, dotenv

**🛠️ How It Works: **The Data Flow

index.html: The user fills out the 4-step form. All data is collected into a formData object.

On submit, the browser makes a POST request to /api/generatePlan with the formData in the body.

**api/generatePlan.js: This Vercel serverless function (running on the backend) securely:**
a.  Builds a massive, detailed "megaprompt" from the user's formData.
b.  Loads the secret GEMINI_API_KEY from Vercel's environment variables.
c.  Calls the Google Gemini API, enabling the Google Search tool.
d.  Receives the AI's response (which is just text with JSON inside).
e.  "Cleans" the response to extract the pure JSON object.
f.  Sends this JSON object back to the browser.

**index.html (Script):** The fetch call receives the JSON and saves it as a string to localStorage.

The script redirects the user to plan.html.

**plan.html (Script):**
a.  On load, the page checks localStorage for the saved plan.
b.  It parses the JSON and dynamically builds the beautiful HTML for all four tabs (Itinerary, At-a-Glance, etc.), including the new Google Maps iframe URLs.
c.  The page content is injected, replacing the "Loading..." message.

