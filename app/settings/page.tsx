import Link from "next/link"
export default function Settings(){
    return(
        <>
        <div>Settings Page</div>
        <Link href="/settings/about">About</Link>
        <Link href="/settings/contact">Contacts</Link>
        <Link href="/settings/services">Services</Link>

        </>
        
    )
}