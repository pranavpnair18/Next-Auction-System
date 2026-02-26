"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link
 from "next/link";
interface AuctionItem {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  startingBid: number;
  endDate: string;
  owner: { name?: string; email: string };
}

export default function ItemsPage() {
  const [items, setItems] = useState<AuctionItem[]>([]);
  const { data: session } = useSession();

  // 🟢 Fetch auction items
  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("/api/items");
      const data = await res.json();
      setItems(data);
    }
    fetchItems();
  }, []);

  
  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Auction Items 🛒</h1>

     {session && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
              <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
              <p className="text-sm text-gray-300">{item.description}</p>
              <p className="text-sm mt-2">💰 ₹{item.startingBid}</p>
              <p className="text-xs text-gray-400">
                Ends: {new Date(item.endDate).toLocaleString()}
              </p>
              <p className="text-xs mt-1 text-gray-500">
               Posted by: {item.owner?.name || item.owner.email}
</p>
<Link href={`/settings/${item.id}`}>
  <button className="mt-3 bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 font-semibold">
    Ask Suggestion
  </button>
</Link>

            </div>
          ))
        ) : (
          <p className="text-gray-400">No items found 😔</p>
        )}
      </div>}
      
      
    </main>
  );
}
