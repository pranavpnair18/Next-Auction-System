"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function AuctionStatsChart() {
  const [data, setData] = useState<{ name: string; bids: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBids() {
      try {
        const res = await fetch("/api/bids");
        const bids = await res.json();

        if (!Array.isArray(bids)) throw new Error("Invalid response");
        setData(bids);
      } catch (err) {
        console.error("Failed to load bids:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBids();
  }, []);

  if (loading) return <p className="text-gray-400">Loading chart...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        🧾 Bids per Auction Item
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name" tick={{ fill: "#ccc" }} />
          <YAxis tick={{ fill: "#ccc" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", borderRadius: "8px", color: "#fff" }}
          />
          <Bar dataKey="bids" fill="#3b82f6" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
