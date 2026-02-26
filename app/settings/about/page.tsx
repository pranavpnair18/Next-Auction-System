import Link from "next/link"
export default function About(){
    return(
        
        <div className="m-5 p-5 flex gap-7 ">
            <div>About</div>
      <Link href="/settings/services" className="bg-blue-500 hover:bg-blue-700 shadow-2xl rounded-2xl p-2">services</Link>
        </div>
    )
}