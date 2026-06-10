"use client";
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{user: string, bot: string}[]>([]);

  async function sendMessage() {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setChat([...chat, { user: input, bot: data.reply }]);
    setInput('');
  }

  return (
    <main style={{ padding: '40px' }}>
      <h1>Chatbot Gemini</h1>
      <div style={{ marginBottom: '20px' }}>
        {chat.map((c, i) => <div key={i}><p><b>Moi:</b> {c.user}</p><p><b>Bot:</b> {c.bot}</p></div>)}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Envoyer</button>
    </main>
  );
}