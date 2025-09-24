"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Toggle from '@/app/components/toggle';

export default function UploadTrack() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("Draft");
  const [error, setError] = useState("");
  const [enabled, setEnabled] = useState(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") === "dark"; // true for dark, false for light
  }
  return false; // default
}); // <- keep it here

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !artist || !releaseDate || !genre) {
      setError("All fields are required");
      return;
    }

    const res = await fetch("/api/tracks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, artist,genre, releaseDate, status }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
  }

  return (
    
    <div
  className={`p-8 min-h-screen transition-colors duration-500 ${
    enabled ?"bg-gradient-to-r from-white to-red-700":"bg-gradient-to-l from-gray-400 to-gray-600"
  }`}
>
  <Toggle
    enabled={enabled}
    onToggle={() => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    localStorage.setItem("theme", newEnabled ? "dark" : "light");
  }}
    className="absolute right-8 top-4"
  />

  {/* Heading stays at top */}
  <h1 className={`text-2xl font-bold mb-8 ${enabled ? "text-black" : "text-white"}`}>
    Upload Track
  </h1>

  {/* Centered form container */}
  <div className="flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow-2xl max-w-lg w-full">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Track Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Artist Name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className={`${enabled?"bg-gray-700 hover:bg-gray-800":"bg-red-700 hover:bg-red-800"} text-white w-full p-2 rounded transition-colors duration-300`}
        >
          Add Track
        </button>
      </form>
    </div>
  </div>
</div>

    
  );
}
