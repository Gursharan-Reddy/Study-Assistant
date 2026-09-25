# Project Assistant

Project Assistant is a full-stack web application that instantly transforms your study notes or unstructured text into interactive study materials, featuring structured flashcards and multiple-choice quizzes powered by the Groq API (`llama-3.3-70b-versatile`).

---

## Architecture Overview

The application follows a decoupled client-server architecture designed for secure API handling and responsive user interactions:

```text
+---------------------+      HTTP / JSON       +---------------------+      Groq SDK        +---------------------+
|                     |   POST /api/generate   |                     |   Inference API      |                     |
|   React Frontend    | ----------------------> |   Express Backend   | -------------------> |     Groq Cloud       |
|  (Vite / Port 5173) |                         |    (Port 5000)      |                       |  (Llama Inference)   |
|                     | <---------------------- |                     | <-------------------- |                     |
+---------------------+      JSON Payload       +---------------------+      Raw JSON         +---------------------+
```

**Frontend Layer (React & Vite)**
Handles user input, state management, and renders interactive views for study decks, flashcards, and quizzes. Communicates with the backend via asynchronous HTTP POST requests.

**Backend Proxy Layer (Node.js & Express)**
Acts as a secure intermediary layer, preventing frontend exposure of secret environment variables. Parses incoming requests, structures system prompts, and interacts with the Groq SDK. Enforces strict JSON schemas to guarantee predictable data formatting for the frontend.

**AI Inference Layer (Groq API)**
Processes prompt text using ultra-fast LLM inference to synthesize educational content, returning structured JSON objects containing flashcards and quiz arrays.

---

## Tech Stack

* **Frontend:** React, Vite, standard CSS.
* **Backend:** Node.js, Express, Cors, Dotenv.
* **AI Engine:** Groq SDK (`groq-sdk`).

---

## Project Directory Structure

```text
project-assistant/
│
├── server/
│   └── server.js          # Express proxy server for Groq API
│
├── src/
│   ├── components/        # UI components (Flashcards, Quiz, Inputs)
│   ├── lib/               # Utility scripts and helper functions
│   ├── types/              # Type definitions
│   ├── App.jsx             # Main React application layout
│   ├── App.css             # Custom application styles
│   ├── index.css           # Global styles
│   └── main.js             # Frontend entry point
│
├── .env                    # Environment variables (API keys)
├── .gitignore              # Ignored files (node_modules, .env)
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

---

## Setup and Installation

### 1. Clone the Repository & Install Dependencies

Open your terminal in the project root directory and install the required packages for both the backend and frontend:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory of your project and add your Groq API key:

```
GROQ_API_KEY=gsk_YourActualGroqApiKeyHere
PORT=5000
```

### 3. Run the Application

**Start the Backend Server:**

```bash
node server/server.js
```

**Start the Frontend Development Server** (in a separate terminal):

```bash
npm run dev
```

Open your browser and navigate to **http://localhost:5173** to use the application.
