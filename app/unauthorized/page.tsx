"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { LockKeyhole } from "lucide-react";


export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-gray-900 via-red-900 to-black text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-md shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <LockKeyhole size={80} className="text-red-400 drop-shadow-md" />
        </div>

        <h1 className="text-4xl font-extrabold mb-4">Access Denied 🚫</h1>
        <p className="text-gray-300 mb-8">
          You don’t have permission to view this page.  
          Please contact your administrator if you think this is a mistake.
        </p>

        <Link href="/">
          <button className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-colors">
            Go Back Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
