"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navigation from "./components/navigation";
import WeddingCountdown from "./components/countdown";

export default function Home() {
  const [showLoginScreen, setShowLoginScreen] = useState(true);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);
  const [error, setError] = useState("");

  // Example passwords — replace with your secure check
  const validPasswords = {
    admin: "admin",
    guest: "guest",
  };

  useEffect(() => {
    // Persist role during session so refresh keeps access
    const saved = sessionStorage.getItem("role");
    if (saved === "admin" || saved === "guest") {
      setRole(saved);
      setShowLoginScreen(false);
    } else {
      setShowLoginScreen(true);
    }
  }, []);

  function handleSubmit(e) {
    e?.preventDefault();
    setError("");
    if (password === validPasswords.admin) {
      setRole("admin");
      sessionStorage.setItem("role", "admin");
      setShowLoginScreen(false);
    } else if (password === validPasswords.guest) {
      setRole("guest");
      sessionStorage.setItem("role", "guest");
      setShowLoginScreen(false);
    } else {
      setError("Invalid password. Access denied.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("role");
    setRole(null);
    setPassword("");
    setShowLoginScreen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <main className="min-h-screen">
      {/* navigation links */}
      <Navigation role={role} />

      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        {/* Names */}
        <h1 className="text-6xl font-bold mb-4">Lucy & Ella</h1>

        <div className="my-8">
          <p className="text-5xl font-bold text-sky-500 mb-4">
            March 25th, 2027
          </p>
          <p className="text-xl md:text-2xl text-gray-700">
            The Grand Lodge at Oaklands
          </p>
        </div>

        <WeddingCountdown />

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto my-12">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src="/content/L&E.jpg"
              alt="Lucy and Ella"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="my-12">
          <a
            href="/rsvp"
            className="inline-block bg-cornflower text-white text-xl font-semibold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            RSVP Now
          </a>
        </div>
      </div>

      {/* Fullscreen password prompt */}
      {showLoginScreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="border rounded-lg p-6 w-full max-w-md mx-4"
            aria-labelledby="pw-title"
          >
            <h2 id="pw-title" className="text-xl font-semibold mb-4">
              Enter password to continue
            </h2>

            <label className="block mb-2">
              <span className="sr-only">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter admin or guest password"
                autoComplete="off"
              />
            </label>

            {error && <p className="text-red-600 mb-2">{error}</p>}

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-cornflower px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  setPassword("");
                  setError("");
                  inputRef.current?.focus();
                }}
                className="px-4 py-2 border rounded"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      )}

      {/* optional: show current role and logout for testing */}
      {role && (
        <div className="fixed bottom-4 right-4 bg-white/90 px-4 py-2 rounded shadow">
          <span className="mr-2">Role: {role}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-blue-600 underline"
          >
            Logout
          </button>
        </div>
      )}
    </main>
  );
}
