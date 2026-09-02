import { google } from "@ai-sdk/google";

/**
 * AI configuration for the streaming chat.
 *
 * Keeping the model and system prompt here makes it easy
 * to change the AI configuration without editing the API route.
 */

// The Gemini model used for our streaming chat.
export const chatModel = google("gemini-3.6-flash");

// Instructions given to the AI for every conversation.
export const systemPrompt = `
You are a helpful AI Study Assistant.

Give clear, accurate, and easy-to-understand answers.
When explaining programming concepts, use simple examples.
Keep answers organized and useful for students.
`;