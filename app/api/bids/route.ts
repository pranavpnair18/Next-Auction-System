import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type BidWithItem = Prisma.BidGetPayload<{
  include: {
    item: {
      select: {
        id: true;
        title: true;
      };
    };
  };
}>;

export async function GET() {
  try {
    const bids: BidWithItem[] = await prisma.bid.findMany({
      include: {
        item: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    console.log("🔍 Prisma returned bids:", JSON.stringify(bids, null, 2));

    const grouped = bids.reduce((acc: Record<string, number>, bid) => {
      const name = bid.item?.title || `Auction ${bid.itemId}`;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(grouped).map((key) => ({
      name: key,
      bids: grouped[key],
    }));

    console.log("📊 ChartData:", chartData);

    return NextResponse.json(chartData, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching bids:", error);
    return NextResponse.json({ error: "Failed to fetch bids" }, { status: 500 });
  }
}
