import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function logAdminAction({
  adminId,
  action,
  target,
  details,
}: {
  adminId: number;
  action: string;
  target?: string;
  details?: string;
}) {
  try {
    await prisma.auditLog.create({
      data: { adminId, action, target, details },
    });
  } catch (error) {
    console.error("❌ Failed to log admin action:", error);
  }
}
