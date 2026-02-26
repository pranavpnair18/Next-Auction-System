import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export default async function Feedback(){
    const session = await getServerSession(authOptions)
    return(
        <>
        <div className="flex justify-center items-center p-10 bg-gray-800  w-full h-40 mr-7 mb-2">
    
            <p className="text-gray-600 dark:text-gray-300">
                {session && `This is your assigned role: ${session.user.role}` } 
            </p>
        </div>
    
        </>
        
    )
}