# C4 Housing AI Chatbot 

AI assistant built for **[CommonKeys](https://commonkeys.org)** — a student-led platform (York University C4 program) that helps low-income individuals and families in the Greater Toronto Area find affordable, accessible, and sustainable housing.

**Best Project Award** — York University C4 Program

## What it does

The chatbot answers user questions about housing listings, affordability levels, upcoming developments, and financial-aid programs. It is grounded in structured JSON data so responses stay accurate and on-topic, and politely redirects out-of-scope questions.

## How it works

- **Node.js CLI app** using the OpenAI Chat Completions API (`gpt-4o-mini`)
- Structured data (`housingData.json` — affordability levels, listings, financial-aid programs) is injected into the system prompt so the model answers **only** from verified information — a lightweight retrieval-grounding approach that prevents hallucinated listings or program details
- Environment-based configuration via `dotenv` (no keys in code)

> `housingData.json` in this repo contains sample data illustrating the structure used in production.

```
User question → system prompt (grounding data + persona) → OpenAI API → response
```

## Run it

```bash
npm install
cp .env.example .env # add your OpenAI API key
node HousingBot.js
```

## Tech stack

`Node.js` · `OpenAI API` · `dotenv` · `readline`

## Context

Developed as part of York University's **C4 (Cross-Campus Capstone Classroom)** program, Team 14. The full CommonKeys site was built in Wix Studio; this repo contains the AI chatbot component.
