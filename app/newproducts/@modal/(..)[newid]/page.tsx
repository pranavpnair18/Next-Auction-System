"use client";

import { useRouter } from "next/navigation";
import { dataStore } from "@/app/datastore/DataStore";
import Modal from "@/app/components/Modal";


export default function ProductModal({ params }: { params: { newid: string } }) {
  const router = useRouter();
  const pid = params.newid;
  const product = dataStore.find((item) => item.id.toString() === pid);

  if (!product) {
    return (
      <Modal>
        <div className="text-white text-center mt-8">No new products (interceptor)</div>
      </Modal>
    );
  }

  return (
    <Modal onClose={() => router.back()} >
      <div className="text-white flex justify-center items-center min-h-7 p-4" >
        <div className="flex flex-col items-center border-2 border-amber-200 rounded-lg p-8 max-w-2xl w-full">
          <img src={product.img} alt={product.title} className="mb-4 max-w-md w-full" />
          <h1 className="text-2xl font-bold mb-4">{product.title} (modal)</h1>
          <p className="text-lg mb-4">{product.desc}</p>
        </div>
      </div>
    </Modal>
  );
}
