"use client";

import { useRef, useState } from "react";

type Phase = "idle" | "waiting" | "ready" | "clicked";

export default function Page() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [message, setMessage] = useState("");
  const startTime = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setMessage("Wait for green...");
    setPhase("waiting");

    const delay = Math.random() * 3000 + 1000;

    timeoutRef.current = setTimeout(() => {
      setPhase("ready");
      startTime.current = Date.now();
      setMessage("CLICK NOW! 🟢");
    }, delay);
  };

  const handleClick = () => {
    if (phase === "waiting") {
      setMessage("Too early ❌");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase("idle");
      return;
    }

    if (phase === "ready") {
      const reaction = Date.now() - startTime.current;
      setMessage(`⚡ Reaction time: ${reaction} ms`);
      setPhase("clicked");
    }
  };

  const reset = () => {
    setPhase("idle");
    setMessage("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <main className={`container ${phase}`} onClick={handleClick}>
      <div className="card">
        <h1>⚡ Reaction Game</h1>
        <p>Click when screen turns green</p>

        <div className="buttons">
          <button onClick={startGame}>Start</button>
          <button onClick={reset} className="secondary">
            Reset
          </button>
        </div>

        <p className="message">{message}</p>
      </div>
    </main>
  );
}