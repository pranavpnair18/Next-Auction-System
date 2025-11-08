"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to /signin if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) return null; // hide page until authenticated

  return (
    <div className="text-center m-14 p-5" >
      <h1 className="font-extrabold text-7xl m-10">Welcome, {session.user?.name || "User"} 👋</h1>
      <p className="text-lg">Your Email: {session.user?.email}</p>

     
    </div>
  );
}

// import Navbar from "./navbar/Navbar";

// import { dataStore } from "./datastore/DataStore";


// export default function Home() {
  
 
//   return (
//     <div className="">
//      {/* <Navbar/> */}
//      <h1 className="text-white text-center font-extrabold">Welcome To Bid-Formula, The Auction Site</h1>
//      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-6 gap-6">
//       {dataStore.map((data)=>(
//         <div key={data.id} className="flex flex-col justify-center text-center items-center border-2 p-4 m-2 border-amber-200">
//           <img src={data.img} alt="AuctionImage" />
//           <h1 className="font-bold">{data.title}</h1>
//           <p>{data.desc}</p>
//         </div>
//       ))}
//      </div>

//     </div>
//   );
// }
