import { JsonRpcProvider, ethers } from 'ethers';
import { Blockchain } from './blockchain';
import { BrowserProvider } from 'ethers';

export class Ethereum implements Blockchain {
    private provider: JsonRpcProvider;

    constructor(rpcUrl: string) {
        this.provider = new JsonRpcProvider(rpcUrl);
    }

    async getBalance(address: string): Promise<string> {
        const balance = await this.provider.getBalance(address);
        return ethers.formatEther(balance);
    }
}
