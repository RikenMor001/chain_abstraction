// app/wallet/page.tsx
"use client";

import { useState } from "react";

export default function Wallet() {
  const [chain, setChain] = useState("ethereum");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetBalance = async () => {
    setError(null);
    setBalance(null);

    try {
      const response = await fetch(`/api/getBalance?chain=${chain}&address=${address}`);
      const data = await response.json();

      if (response.ok) {
        setBalance(data.balance);
      } else {
        setError(data.error || "Unknown error occurred");
      }
    } catch (err) {
      console.error("Error fetching balance:", err);
      setError("Error fetching balance. Please check the address and try again.");
    }
  };

  return (
    <div className="container">
      <h1>Blockchain Balance Checker</h1>

      <select value={chain} onChange={(e) => setChain(e.target.value)}>
        <option value="ethereum">Ethereum</option>
        <option value="solana">Solana</option>
      </select>

      <input
        type="text"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={handleGetBalance}>Get Balance</button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {balance && <p>Balance: {balance}</p>}
    </div>
  );
}
