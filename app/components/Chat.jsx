"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

export default function Chat() {
  const [input, setInput] = useState("");
  const [showJumpButton, setShowJumpButton] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isStreaming = status === "streaming";
  const isThinking = status === "submitted";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) return;

    const handleScroll = () => {
      const distanceFromBottom =
        container.scrollHeight -
        container.scrollTop -
        container.clientHeight;

      setShowJumpButton(distanceFromBottom > 120);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    if (distanceFromBottom < 120) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = input.trim();

    if (!text || isStreaming || isThinking) return;

    sendMessage({
      text,
    });

    setInput("");
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <div>
          <h1>AI Study Assistant</h1>
          <p>Ask questions and learn with AI</p>
        </div>

        <div className="status-indicator">
          <span></span>
          AI Online
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        className="chat-messages"
      >
        {messages.length === 0 && (
          <div className="welcome-message">
            <div className="welcome-icon">AI</div>

            <h2>How can I help you study?</h2>

            <p>
              Ask me about programming, concepts, interview
              preparation, or anything you're learning.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-row ${
              message.role === "user"
                ? "user-row"
                : "assistant-row"
            }`}
          >
            <div
              className={`message-bubble ${
                message.role === "user"
                  ? "user-message"
                  : "assistant-message"
              }`}
            >
              {message.parts?.map((part, index) => {
                if (part.type !== "text") return null;

                return (
                  <div key={`${message.id}-${index}`}>
                    {part.text}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="message-row assistant-row">
            <div className="message-bubble assistant-message thinking">
              <span></span>
              <span></span>
              <span></span>
              <span className="thinking-text">
                AI is thinking...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {showJumpButton && (
        <button
          type="button"
          className="jump-button"
          onClick={scrollToBottom}
        >
          ↓ Jump to latest
        </button>
      )}

      <form
        className="chat-input-area"
        onSubmit={handleSubmit}
      >
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask your study question..."
          disabled={isStreaming || isThinking}
          rows={1}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit(event);
            }
          }}
        />

        {isStreaming || isThinking ? (
          <button
            type="button"
            className="stop-button"
            onClick={stop}
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            className="send-button"
            disabled={!input.trim()}
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}