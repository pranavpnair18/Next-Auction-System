"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password ❌");
    } else {
      window.location.href = "/"; // redirect to home after success
    }
  };

  return (
    <div className="flex justify-center items-center text-white p-7 m-20 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 p-5 w-sm border-2 border-solid border-amber-50 rounded-2xl shadow-2xl mt-0"
        
      >
        <h2 style={{ textAlign: "center" }}>Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          className=" m-auto mb-3 p-2 rounded border-2 font-bold w-2xs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className=" m-auto mb-3 p-2 rounded border-2 font-bold w-2xs"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <button type="submit" className="w-2xs p-2 mb-3 m-auto rounded bg-blue-500 hover:bg-white hover:text-black transition">Sign In</button>
      </form>
    </div>
  );
}
