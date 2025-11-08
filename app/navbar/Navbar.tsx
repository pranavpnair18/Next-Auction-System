"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter()

  return (
    <nav className="flex justify-between items-center m-2 p-2 gap-4">
      {session && (
  <p className="text-sm text-gray-200">
    Logged in as <span className="font-semibold">{session.user.email}</span> ({session.user.role})
  </p>
)}
      <div className="text-amber-50 font-bold">Bid-Formula</div>

      <div className="flex gap-6 items-center">
        

        {/* 👇 Conditional buttons based on session */}
        {status === "loading" ? (
          <p className="text-white">Loading...</p>
        ) : session ? (
          <>
          {session.user.role == "ADMIN" && <Link href="/admin">
          <button className="bg-amber-50 shadow-2xl font-bold rounded-2xl p-2 hover:bg-yellow-200 text-black">
            Admin Panel
          </button>
        </Link>}
          
          <Link href="/dashboard">
          <button className="bg-amber-50 shadow-2xl font-bold rounded-2xl p-2 hover:bg-yellow-200 text-black">
            Dashboard
          </button>
        </Link>
        {(session.user.role == "MODERATOR" || session.user.role == "ADMIN") &&
         <Link href="/settings">
          <button className="bg-amber-50 shadow-2xl font-bold rounded-2xl p-2 hover:bg-yellow-200 text-black">
            Settings
          </button>
        </Link>}
        
        <Link href="/endedproducts">
          <button className="bg-amber-50 shadow-2xl font-bold rounded-2xl p-2 hover:bg-yellow-200 text-black">
            View Ended
          </button>
        </Link>
        <Link href="/search">
          <button className="bg-amber-50 shadow-2xl font-bold rounded-2xl p-2 hover:bg-yellow-200 text-black">
            Search
          </button>
        </Link>
        
          
            <button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="bg-amber-50 shadow-2xl font-bold rounded-2xl p-2 hover:bg-yellow-200 text-black"
            >
              Sign-out
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/signup")}
            className="bg-amber-50 shadow-2xl font-bold rounded-2xl p-2 hover:bg-yellow-200 text-black"
          >
            Sign-up
          </button>
        )}
      </div>
    </nav>
  );
}
