import { Blockchain } from "./blockchain";
import { Connection, PublicKey } from "@solana/web3.js";

export class Solana implements Blockchain{
    private connection: Connection;

    constructor(rpcUrl: string){
        this.connection = new Connection(rpcUrl);
    }
    
    async getBalance(address: string): Promise<string> {
        const publicKey = new PublicKey(address);
        const balance = await this.connection.getBalance(publicKey);
        return (balance / 1e9).toString();
    }
}