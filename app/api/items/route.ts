import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// ✅ GET: Fetch all auction items
export async function GET() {
  try {
    const items = await prisma.auctionItem.findMany({
     where: {
  endDate: {
    gt: new Date(), // only items whose endDate is greater than current time
  },
},
      include: {owner: true},
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("❌ Error fetching auction items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

// ✅ POST: Add a new auction item (authenticated users only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, imageUrl, startingBid, endDate } = await req.json();

    // Basic validation
    if (!title || !description || !startingBid || !endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newItem = await prisma.auctionItem.create({
      data: {
        title,
        description,
        imageUrl,
        startingBid: parseFloat(startingBid),
        endDate: new Date(endDate),
        owner: { connect: { id: Number(session.user.id) } },
      },
      include: { owner: true }, // 👈 Important! fetch owner relation in response
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error("❌ Error creating auction item:", error);
    return NextResponse.json({ error: "Failed to create auction item" }, { status: 500 });
  }
}
