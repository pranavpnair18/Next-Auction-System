import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Usertable from "./Usertable";
import { number } from "framer-motion";

const prisma = new PrismaClient();


export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || !["ADMIN", "MODERATOR"].includes(session.user.role)) {
    redirect("/unauthorized");
  }
  

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
            bids: true
        }
      }
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