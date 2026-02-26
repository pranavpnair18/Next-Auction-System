"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  startingBid: number;
  endDate: string;
  owner: { name?: string; email: string };
}

export default function GenAIFetch() {
  const { id } = useParams();
  const { data: session } = useSession();

  const [output, setOutput] = useState("Loading...");
  const [item, setItem] = useState<Item | null>(null);

  // 1️⃣ Fetch the item first
  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`/api/items/${id}`);
        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error("Error fetching item:", err);
      }
    }
    fetchItem();
  }, [id]);

  // 2️⃣ When the item is fetched, then call AI
  useEffect(() => {
    if (!item) return; // wait until item is loaded

    async function fetchAi() {
      try {
        const prompt = `What should be the first bid that can bid to an auction item of starting bid ${item!.startingBid}?`;


        const res = await fetch("/api/ai/starting_bid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ params: prompt }),
        });

        if (!res.ok) throw new Error("AI fetch failed");

        const data = await res.json();
        setOutput(data.output);
      } catch (err) {
        console.error("Error fetching AI:", err);
        setOutput("Error generating AI response");
      }
    }

    fetchAi();
  }, [item]); // <- runs only when 'item' changes

  return (
    <div>
      <h1 className="font-bold text-6xl text-center text-violet-600 m-4">Generative AI Content</h1>
      <p>{output.split("*")}</p>
    </div>
  );
}
