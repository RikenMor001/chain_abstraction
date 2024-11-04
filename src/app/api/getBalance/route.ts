// app/api/getBalance/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ChainType, createBlockchain } from "@/blockchainFactory";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chain = searchParams.get("chain") as ChainType;
  const address = searchParams.get("address");

  if (!chain || !address) {
    return NextResponse.json(
      { error: "Invalid request parameters" },
      { status: 400 }
    );
  }

  try {
    const rpcUrl =
      chain === "ethereum"
        ? "https://mainnet.infura.io/v3/21a6ce352475455b975bc887e8024b5b" 
        : "https://api.mainnet-beta.solana.com";

    const blockchain = createBlockchain(chain, rpcUrl);
    const balance = await blockchain.getBalance(address);

    return NextResponse.json({ balance }, { status: 200 });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json(
      { error: "Error fetching balance" },
      { status: 500 }
    );
  }
}
