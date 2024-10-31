'use client'

import { useState } from "react";

export default function Home() {
    const [chain, setChain] = useState('ethereum');
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');

    const handleGetBalance = async () => {
        try {
            const response = await fetch(`/api/getBalance?chain=${chain}&address=${address}`);
            const data = await response.json();
            setBalance(data.balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
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
            {balance && <p>Balance: {balance}</p>}
        </div>
    );
}
