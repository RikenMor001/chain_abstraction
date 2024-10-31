import { Blockchain } from "./blockchain";
import { Ethereum } from "./etherium";
import { Solana } from "./solana";


export enum ChainType{
    Ethereum = 'ethereum',
    Solana = 'solana'
}

export function createBlockchain(chainType: ChainType, rpcUrl: string): Blockchain{
    switch(chainType){
        case ChainType.Ethereum:
            return new Ethereum(rpcUrl);
        case ChainType.Solana: 
        return new Solana(rpcUrl);
        default: 
        throw new Error("Unsupported blockchain type")
    }
}