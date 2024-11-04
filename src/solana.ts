import { Blockchain } from "./blockchain";
import { Connection, PublicKey } from "@solana/web3.js";

export class Solana implements Blockchain {
  private connection: Connection;

  constructor(rpcUrl: string) {
    this.connection = new Connection(rpcUrl);
  }

  async getBalance(address: string): Promise<string> {
    try {
      const publicKey = new PublicKey(address);
      const balance = await this.connection.getBalance(publicKey);
      return (balance / 1e9).toFixed(4); 
    } catch (error) {
      console.error("Error fetching Solana balance:", error);
      throw new Error("Error fetching Solana balance");
    }
  }
}
