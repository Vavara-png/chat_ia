"use client";

import { useState, useEffect, useRef } from "react";
import "./globals.css";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string; time: string }[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const now = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    const newMessages = [...messages, { role: "user", content: input, time: now }];
    setMessages(newMessages);

    // limpa imediatamente o campo
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const replyTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    setMessages([...newMessages, { role: "assistant", content: data.reply, time: replyTime }]);
  };

  // Scroll automático sempre para a última mensagem
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-wrapper">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`bubble ${msg.role}`}>
            <span>{msg.content}</span>
            <div className="time">{msg.time}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.ctrlKey) {
                // quebra de linha com Ctrl+Enter
                setInput(input + "\n");
              } else {
                e.preventDefault(); // evita quebra de linha padrão
                sendMessage();
              }
            }
          }}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}
