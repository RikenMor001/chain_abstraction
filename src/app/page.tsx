'use client'

import { useState } from "react";

export default function Home() {
  const [chain, setChain] = useState('ethereum');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  const handleGetBalance = async () => {
    try {
      const response = await fetch(`/api/getBalance?chain=${chain}&address=${address}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setBalance(data.balance || 'Error fetching balance');
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance('Error fetching balance');
    }
  };

  return (
    <div className="container">
      <h1>Blockchain Balance Checker</h1>
      <input
        type="text"
        placeholder="Enter Ethereum Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleGetBalance}>Get Balance</button>
      {balance && <div>Balance: {balance} ETH</div>}
    </div>
  );
}
