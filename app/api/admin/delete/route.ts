import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { logAdminAction } from "@/lib/auditLogger";

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if(!session?.user.role || ["ADMIN", "MODERATOR"].includes(session?.user.role)){
        return NextResponse.json({error: "unauthorized", status:403})
    }
    try{
        const userid =await req.json()
        console.log(userid)
        if(userid.email == "admin@example.com"){
            return NextResponse.json({error: "Cannot delete Default Admin", status: 403})
        }

        const deleted = await prisma.user.delete({
            where:{id: userid}
        })
        await logAdminAction({
                    adminId: Number(session.user.id),
                    action: "Deleted User",
                    target: userid,
                    details: `User ID: ${userid}`,
    });
        return NextResponse.json({success: true, user: deleted})
    }catch(err){
            console.log("caanot delete user", err);
            return NextResponse.json({error:"server error", status: 500})
    }

}