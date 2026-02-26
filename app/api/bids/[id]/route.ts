import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const itemId = Number((await params).id);
  
    const bids = await prisma.bid.findMany({
      where: { itemId },
      orderBy: { createdAt: "desc" },
      include: { bidder: { select: { id: true, name: true, email: true } } },
    });
    

    const highest = bids.length ? bids[0] : null; // because ordered desc
    return NextResponse.json({ bids, highest });
  } catch (err) {
    console.error("Error fetching bids:", err);
    return NextResponse.json({ error: "Failed to fetch bids" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const itemId = Number((await params).id);
    const { amount } = await req.json();

    if (!amount || isNaN(amount)) {
      return NextResponse.json({ error: "Invalid bid amount" }, { status: 400 });
    }

    const item = await prisma.auctionItem.findUnique({
      where: { id: itemId },
      include: { bids: true },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // ✅ Find current highest bid
    const highestBid = await prisma.bid.findFirst({
      where: { itemId },
      orderBy: { amount: "desc" },
    });

    if (highestBid && amount <= highestBid.amount) {
      return NextResponse.json(
        { error: "Bid must be higher than the current highest bid" },
        { status: 400 }
      );
    }

    // ✅ Create new bid
    const newBid = await prisma.bid.create({
      data: {
        amount,
        bidderId: Number(session.user.id),
        itemId,
      },
      include: {bidder: true}
    });

    return NextResponse.json({ success: true, bid: newBid });
  } catch (err) {
    console.error("Error placing bid:", err);
    return NextResponse.json({ error: "Failed to place bid" }, { status: 500 });
  }
}