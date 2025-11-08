"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
  // const [form, setForm] = useState({
  //   title: "",
  //   description: "",
  //   startingBid: "",
  //   endDate: "",
  //   imageUrl: "",
  // });
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

  // 🟢 Handle input change
  // function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //   const { name, value } = e.target;
  //   setForm((prev) => ({ ...prev, [name]: value }));
  // }

  // // 🟢 Submit new auction item
  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();

  //   const res = await fetch("/api/items", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(form),
  //   });

  //   if (res.ok) {
  //     const newItem = await res.json();
      
  //     alert("✅ Item added successfully!");
  //     setItems((prev) => [...prev, newItem]); // instantly show new item
  //     setForm({ title: "", description: "", startingBid: "", endDate: "", imageUrl: "" });
  //   } else {
  //     alert("❌ Failed to add item");
  //   }
  // }

  return (
    <main className="p-6 text-white">
      <input type="/" />
      <button >new butt</button>

      {/* {session ? (
        <>
          {/* Add Item Form */}
          {/* <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8"
          > */}
            {/* <h2 className="text-lg font-semibold mb-4">Add New Auction Item</h2> */} 

            {/* <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Item Title"
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600"
              required
            /> */}
            {/* <input
              name="startingBid"
              value={form.startingBid}
              onChange={handleChange}
              type="number"
              placeholder="Starting Bid"
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600"
              required
            />
            <input
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              type="datetime-local"
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600"
              required
            /> */}
            {/* <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="Image URL (optional)"
              className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
            /> */}

            {/* <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Item
            </button>
          </form> */}
        {/* </> */}
      {/* // ) : (
      //   <p className="text-red-400 mb-4">
      //     ⚠️ You must be logged in to add auction items.
      //   </p>
      // )} */}

      {/* Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

            </div>
          ))
        ) : (
          <p className="text-gray-400">No items found 😔</p>
        )}
      </div>
    </main>
  );
}
