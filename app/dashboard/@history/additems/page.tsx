"use client"
import { useSession } from "next-auth/react"
import React, { useState } from "react"





export default function AddItem(){

    const {data:session} = useSession()
    const [form, setfrom] = useState({
        title: "",
    description: "",
    startingBid: "",
    endDate: "",
    imageUrl: "",

    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target
        setfrom((prev)=>({...prev, [name]:value}))

    }
    const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {

      const newItem = await res.json();
      console.log(newItem);
      
      alert("✅ Item added successfully!");
    } else {
      alert("❌ Failed to add item");
    }

    setfrom({
        title: "",
    description: "",
    startingBid: "",
    endDate: "",
    imageUrl: "",

    })
    }
    return(
                <>
                {session && <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8"
          >
            <h2 className="text-lg font-semibold mb-4">Add New Auction Item</h2>

            <input
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
            />
            <input
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
            />
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="Image URL (optional)"
              className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
            />

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Item
            </button>
          </form>}
                
                
                </>
    )
}