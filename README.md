# Streaming AI Chat Interface

A streaming AI chat application built with Next.js, React, Gemini, and the AI SDK as part of the FlyRank AI Internship.

## Features

- Real-time streaming AI responses
- Gemini AI integration
- Server-side API route for secure AI requests
- User and assistant message bubbles
- Thinking indicator while the AI starts responding
- Stop button to stop an active response
- Partial streamed response is preserved after stopping
- Conversation continues across multiple turns
- Automatic scrolling during responses
- Jump-to-latest button when the user scrolls up
- Responsive design for mobile and desktop
- Enter to send and Shift + Enter for a new line

## Tech Stack

- Next.js
- React
- JavaScript
- Google Gemini
- Vercel AI SDK
- CSS

## Project Structure

```text
app/
├── api/
│   └── chat/
│       └── route.js
├── components/
│   └── Chat.jsx
├── lib/
│   └── ai.js
├── layout.js
└── page.js

public/
style.css
package.json