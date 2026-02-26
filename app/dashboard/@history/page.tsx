import Link from "next/link"
export default function History(){
    return(
        <>
        <div className="flex justify-center items-center p-10 dark:bg-gray-800  w-full h-40 mr-7">
    
           
               <Link href="/dashboard/additems">
               <button className="bg-blue-500 text-white hover:bg-blue-600 shadow-2xl rounded-2xl p-2 m-2">Add Your Auction Item</button>
                </Link>
               
            
        </div>
    
        </>
        
    )
}