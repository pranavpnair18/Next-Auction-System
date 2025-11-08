"use client"
import { useSession } from "next-auth/react"

export default function Notifications(){
const {data: session} = useSession()


    return(
        <>
        <div className="flex justify-center p-10 dark:bg-gray-800  w-80 h-96 m-3">
    
            <h2 className="text-gray-600 dark:text-gray-300">
               {session && `This is your assigned role: ${session.user.role}` } 
            </h2>
        </div>

        </>
        
    )
}