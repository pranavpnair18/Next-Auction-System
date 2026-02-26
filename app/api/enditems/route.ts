

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(){
const session = await getServerSession(authOptions)

if(!session){
    return NextResponse.redirect("/unauthorized")
}
try{
    const items = prisma.auctionItem.findMany({
        where:{
            endDate:{
                lt: new Date()
            }
        },
          include: {owner: true},
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(items)
}catch(error){
    console.error("❌ Error fetching auction items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
}
}