import { ethers, formatEther } from "ethers";
import { Blockchain } from "./blockchain";
import { JsonRpcProvider } from "ethers";

export class Ethereum implements Blockchain {
  private provider: JsonRpcProvider;

  constructor(rpcUrl: string) {
    this.provider = new JsonRpcProvider(rpcUrl);
  }

  async getBalance(address: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(address);
      return formatEther(balance); 
    } catch (error) {
      console.error("Error fetching Ethereum balance:", error);
      throw new Error("Error fetching Ethereum balance");
    }
  }
}
