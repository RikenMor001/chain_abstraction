import { ChainType, createBlockchain } from "@/blockchainFactory";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse){
    const { searchParams } = new URL(req.url);
    const chain = searchParams.get('chain');
    const address = searchParams.get('address');

    if (!chain || !address){
        return NextResponse.json({
            balance: "Invalid request parameters"
        },{status:400})
    }

    try
    {
        const rpcUrl = chain === 'ethereum'? 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID': 'https://api.mainnet-beta.solana.com';

        const blockchain = createBlockchain(chain as ChainType, rpcUrl);
        const balance = await blockchain.getBalance(address);
        return NextResponse.json({balance}, {status: 200})
    }catch(error){
        return NextResponse.json({
            balance: "Error fetching balance"
        }, {status: 500})
    }
}

