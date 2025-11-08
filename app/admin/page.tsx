import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Usertable from "./Usertable";

const prisma = new PrismaClient();


export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold">Admin Dashboard 🛡️</h1>
      <p>Welcome, {session.user.name}! You are an {session.user.role}.</p>
      <Usertable users={users} />
    </div>
  );
}