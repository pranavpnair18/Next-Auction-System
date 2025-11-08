"use client";
import { dataStore } from "../datastore/DataStore";
import { useRouter } from "next/navigation";

export default function NewProducts() {
  const router = useRouter();

  const handleViewProduct = (id: number) => {
    router.push(`/newproducts/${id}`); // correct path
    // router.push(`/newproducts/@modal/${id}`);
  };

  return (
    <div className="text-white">
      <h1 className="text-center font-extrabold">New Auction Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-6 gap-6">
        {dataStore.map((data) => (
          <div key={data.id} className="flex flex-col justify-center text-center items-center border-2 p-4 m-2 border-amber-200 rounded-lg">
            <img src={data.img} alt="AuctionImage" className="mb-2" />
            <h1 className="font-bold">{data.title}</h1>
            <p>{data.desc}</p>
            <button onClick={() => handleViewProduct(data.id)} className="mt-4 bg-amber-400 text-black font-bold px-4 py-2 rounded-md hover:bg-amber-500">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
