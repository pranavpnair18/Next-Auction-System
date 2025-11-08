// app/api/admin/users/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust path if needed

const prisma = new PrismaClient();

export async function GET() {
  // ✅ Get the current session
  const session = await getServerSession(authOptions);

  // ❌ Not logged in or not admin
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // ✅ Fetch all users (but hide password field)
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return NextResponse.json(users);
}
