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
            <div className="flex flex-col">
                <div className="rounded-lg px-2 py-2 bg-slate-800 text-white w-24">
                    <button onClick={handleGetBalance}>Get Balance</button>
                </div>
                <div>
                    {balance && <div>
                        Balance: {balance}
                    </div>}
                </div>
            </div>
        </div>
    );
}
