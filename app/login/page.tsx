"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fetchPayload = {
        action: "fetch",
        payload: {
          TableName: "tbl_user",
          Key: {
            email: formData.email,
          },
        },
      };

      const response = await fetch("https://jkeawlulszxxr42r2uuntuorvq0ieoot.lambda-url.eu-north-1.on.aws/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchPayload),
      });

      const result = await response.json();

      if (!response.ok || !result.Item) {
        throw new Error("User not found.");
      }

      const user = result.Item;

      if (user.password !== formData.password) {
        throw new Error("Incorrect password.");
      }

      // Save token with expiry timestamp
      localStorage.setItem(
        "tunestream_token",
        JSON.stringify({
          email: user.email,
          name: user.name,
          timestamp: Date.now(),
        })
      );

      alert("Login successful!");
      router.push("/dashboard");

    } catch (err: any) {
      alert(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f011c] to-[#1a052e] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gradient-to-br from-purple-900 via-[#1a052e] to-[#0f011c] p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Login to Poplir</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-lg font-semibold hover:scale-105 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-400 mb-2">Don't have an account?</p>
          <button
            onClick={() => router.push("/join")}
            className="w-full py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white text-sm font-medium transition"
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}
