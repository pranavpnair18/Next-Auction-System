import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 🕓 Find auctions that have ended but are not yet marked as completed
    const expiredItems = await prisma.auctionItem.findMany({
      where: {
        endDate: { lt: new Date() },
        completed: false, // you'll add this field below
      },
      include: {
        bids: {
          orderBy: { amount: "desc" },
          take: 1, // highest bid only
          include: { bidder: true },
        },
      },
    });

    const notifications: { userId: number; message: string }[] = [];

    for (const item of expiredItems) {
      const highestBid = item.bids[0];
      if (highestBid) {
        notifications.push({
          userId: highestBid.bidder.id,
          message: `🎉 You won the auction for "${item.title}" with ₹${highestBid.amount}!`,
        });
      }

      // ✅ Mark auction as completed
      await prisma.auctionItem.update({
        where: { id: item.id },
        data: { completed: true },
      });
    }

    return NextResponse.json({ success: true, notifications });
  } catch (error) {
    console.error("❌ Error checking auctions:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
