"use client";

import { useRouter } from "next/navigation";

export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) onClose();
    else router.back();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
