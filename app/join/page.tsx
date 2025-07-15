"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const nameFromEmail = formData.email.split("@")[0];
      const payload = {
        TableName: "tbl_user",
        Item: {
          email: formData.email,
          password: formData.password,
          name: formData.name || nameFromEmail,
          phone: formData.phone || "",
          created_at: new Date().toISOString(),
        },
      };

      const res = await fetch(
        "https://jkeawlulszxxr42r2uuntuorvq0ieoot.lambda-url.eu-north-1.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "create", // this is what your Lambda now expects
            payload,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Signup failed. Please try again.");
      }

      const result = await res.json();

      // Save token (for 12-hour session)
      localStorage.setItem(
        "tunestream_token",
        JSON.stringify({
          email: formData.email,
          name: formData.name || nameFromEmail,
          timestamp: Date.now(),
        })
      );

      alert("Account created successfully!");
      router.push("/dashboard");

    } catch (error: any) {
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f011c] to-[#1a052e] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gradient-to-br from-purple-900 via-[#1a052e] to-[#0f011c] p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Join Poplir</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm text-gray-300">Name</label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Optional"
              className="w-full px-4 py-2 rounded-lg bg-[#1a052e] border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              required
              name="email"
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-[#1a052e] border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-gray-300">Password</label>
            <input
              required
              name="password"
              id="password"
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-[#1a052e] border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 text-sm text-gray-300">Phone <span className="text-xs text-gray-500">(optional)</span></label>
            <input
              name="phone"
              id="phone"
              type="tel"
              className="w-full px-4 py-2 rounded-lg bg-[#1a052e] border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-lg font-semibold hover:scale-105 transition"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-400 mb-2">Already registered?</p>
          <button
            onClick={() => router.push("/login")}
            className="w-full py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition"
          >
            Login Instead
          </button>
        </div>
      </div>
    </div>
  );
}
