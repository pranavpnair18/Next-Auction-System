"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useNotificationStore } from "@/app/store/useNotificationStore";

interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  startingBid: number;
  endDate: string;
  owner: { name?: string; email: string };
}

interface Bid {
  id: number;
  amount: number;
  bidder: { name: string; email: string };
}

export default function ItemDetails() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [item, setItem] = useState<Item | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [amount, setAmount] = useState("");
  const [highestBid, setHighestBid] = useState<number | null>(null);
  const { addNotification } = useNotificationStore();



  // 🟢 Fetch item details
 useEffect(() => {
  if (!id) return;

  async function fetchItem() {
    const res = await fetch(`/api/items/${id}`);
    const data = await res.json();
    setItem(data);
  }

  async function fetchBids() {
    const res = await fetch(`/api/bids/${id}`);
    if (!res.ok) return setBids([]); // fail-safe
    const data = await res.json();
    // API returns { bids, highest } — ensure we set an array only
    const bidsArray = Array.isArray(data) ? data : data?.bids ?? [];
    setHighestBid(data.highest ? data.highest.amount : null);
    setBids(bidsArray);
  }

  fetchItem();
  fetchBids();
}, [id]);

  // 🟢 Place a new bid
 async function handleBid() {
  if (!session) {
    alert("You must be logged in to place a bid!");
    return;
  }
  if (!amount || isNaN(Number(amount))) {
    alert("Please enter a valid amount");
    return;
  }

  const res = await fetch(`/api/bids/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: parseFloat(amount) }), // itemId not needed because URL has id
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Failed to place bid");
    return;
  }

  // defensive append: if prev isn't an array, replace it
  setBids((prev) =>
    Array.isArray(prev) ? [data.bid, ...prev] : [data.bid]
  );
  setHighestBid((prev) => 
  !prev || data.bid.amount > prev ? data.bid.amount : prev
);


  alert("✅ Bid placed successfully!");
  // 🟢 Simulate win notification (for demo)
addNotification(session.user.id, `You placed a new bid on "${item?.title}"!`);

  setAmount("");
}

  return (
    <main className="p-8 text-white flex flex-col justify-center items-center ">
      {item ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full max-w-xl rounded-lg mb-4"
            />
          )}
          <p className="text-gray-300 mb-2">{item.description}</p>
          <p className="text-yellow-400 font-semibold mb-2">
            💰 Starting Bid: ₹{item.startingBid}
          </p>
           
           <p className="text-green-400 font-semibold mb-2">
  🔝 Current Highest Bid: ₹{highestBid ?? "No bids yet"}
</p>
          
          <p className="text-gray-400 mb-2">
            Ends on: {new Date(item.endDate).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Posted by: {item.owner?.name || item.owner?.email || "Unknown"}
          </p>

          {/* 💸 Place Bid Section */}
          <div className="bg-gray-900 p-4 rounded-lg shadow-md max-w-md text-center">
            <h3 className="text-xl mb-3 font-semibold">Place Your Bid</h3>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 text-white rounded-md mb-3"
              placeholder="Enter your bid amount"
            />
            <button
              onClick={handleBid}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 font-semibold"
            >
              Submit Bid
            </button>
          </div>

          {/* 📊 Show Current Bids */}
          <div className="mt-6 w-full">
            <h3 className="text-xl font-semibold mb-3">Recent Bids</h3>
            {bids.length > 0 ? (
              <ul className="space-y-2">
                {bids
                  .sort((a, b) => b.amount - a.amount)
                  .map((bid) => (
                    <li
                      key={bid.id}
                      className="bg-gray-800 p-3 rounded-md flex justify-between"
                    >
                      <span>
                        {bid.bidder?.name || bid.bidder?.email || "Unknown"}
                      </span>
                      <span className="text-yellow-400 font-semibold">
                        ₹{bid.amount}
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-400">No bids yet. Be the first!</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-400">Loading item...</p>
      )}
    </main>
  );
}
