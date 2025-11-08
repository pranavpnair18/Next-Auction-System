import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // ✅ Verify admin privileges
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { userId, newRole } = await req.json();

    if (!userId || !newRole || userId.email == "admin@example.com")
      return NextResponse.json({ error: "Missing fields or Default Admin role cannot be changed" }, { status: 400 });

    // ✅ Update role in DB
    
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
    return NextResponse.json({ success: true, user: updated });
  
    
  } catch (err) {
    console.error("Error updating role:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
