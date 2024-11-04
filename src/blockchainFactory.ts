// blockchainFactory.ts
import { Solana } from "./solana";
import { Blockchain } from "./blockchain";
import { Ethereum } from "./etherium";

export type ChainType = "ethereum" | "solana";

export function createBlockchain(chain: ChainType, rpcUrl: string): Blockchain {
  switch (chain) {
    case "ethereum":
      return new Ethereum(rpcUrl);
    case "solana":
      return new Solana(rpcUrl);
    default:
      throw new Error("Unsupported chain type");
  }
}




