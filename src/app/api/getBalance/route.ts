import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chain = searchParams.get("chain");
  const address = searchParams.get('address');

  if (!chain || !address) {
    return NextResponse.json({
      error: "Invalid request parameters"
    }, { status: 400 });
  }

  try {

    const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/21a6ce352475455b975bc887e8024b5b");


    const balance = await provider.getBalance(address);
    const formattedBalance = ethers.formatEther(balance);

    return NextResponse.json({
      balance: formattedBalance
    });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json({
    }, { status: 500 });
  }
}
