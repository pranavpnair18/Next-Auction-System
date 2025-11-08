"use client";

import { useEffect, useState } from "react";
import { DataStore } from "../datastore/DataStore";
import Getbyid from "../datastore/DataStore";
import { useRouter } from "next/navigation";




export default function Searchpage() {
  const [sid, setSid] = useState<string>("");
  const [item, setItem] = useState<DataStore | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if the page is being refreshed
    const handleBeforeUnload = () => {
      // Store a flag in sessionStorage
      sessionStorage.setItem('isRefreshing', 'true');
    };

    const checkRefresh = () => {
      const isRefreshing = sessionStorage.getItem('isRefreshing');
      if (isRefreshing) {
        // Clear the flag
        sessionStorage.removeItem('isRefreshing');
        // Redirect to home
        router.push('/');
      }
    };

    // Add event listener for page refresh
    window.addEventListener('beforeunload', handleBeforeUnload);
    // Check if we're coming from a refresh
    checkRefresh();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSid(e.target.value);
  };

  const handleSubmit = () => {
    
    const result = Getbyid(sid);
    setItem(result ?? null);
  };

  return (
    <div className="text-white flex flex-col items-center">
      <div className="flex gap-2 my-4">
        <input
          type="text"
          onChange={handleChange}
          value={sid}
          placeholder="Enter search ID"
          className="p-2 rounded-md text-white"
        />
        <button
          onClick={handleSubmit}
          className="bg-amber-400 text-black font-bold px-4 py-2 rounded-md hover:bg-amber-500"
        >
          Search
        </button>
      </div>

      {item ? (
        <div className="flex flex-col justify-center text-center items-center border-2 p-4 m-2 border-amber-200 rounded-lg w-1/4">
          <img src={item.img} alt="AuctionImage" className="mb-2" />
          <h1 className="font-bold">{item.title}</h1>
          <p>{item.desc}</p>
        </div>
      ) : (
        <p className="mt-4">No item found.</p>
      )}
    </div>
  );
}
