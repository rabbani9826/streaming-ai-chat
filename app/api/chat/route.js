import { streamText } from "ai";
import { chatModel, systemPrompt } from "../../lib/ai";

export const maxDuration = 30;

export async function POST(req) {
    try {
        const data = await req.json();
        const messages = data.messages || [];

        const modelMessages = messages.map((message) => {
            let text = "";

            if (message.parts) {
                message.parts.forEach((part) => {
                    if (part.type === "text") {
                        text = text + part.text;
                    }
                });
            }

            return {
                role: message.role,
                content: text,
            };
        });

        const result = streamText({
            model: chatModel,
            system: systemPrompt,
            messages: modelMessages,
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error("Chat API error:", error);

        return new Response(
            JSON.stringify({
                error: "Failed to generate response.",
            }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}