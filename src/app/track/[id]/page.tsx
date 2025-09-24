"use client";

import { useState } from "react";
import Toggle from "@/app/components/toggle";
import { useParams } from "next/navigation";
import tracks from "../../../../tracks.json"; // adjust relative path from page.tsx

interface Track {
  id: number;
  title: string;
  artist: string;
  releaseDate: string;
  genre?: string;
  status: string;
}

export default function TrackDetails() {
  const { id } = useParams();
  const trackId = Number(id);
  const [enabled, setEnabled] = useState(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") === "dark"; // true for dark, false for light
  }
  return false; // default
});
  // Find the track directly from the JSON
  const track: Track | undefined = tracks.find((t) => t.id === trackId);

  if (!track) return <p className="p-4">Track not found</p>;

  return (
    <div className={`${enabled?"bg-gradient-to-r from-white to-red-700":"bg-gradient-to-l from-gray-400 to-gray-600"} min-h-screen p-8 transition-colors duration-500`}>
      <div className={`max-w-2xl mx-auto mt-8 p-6 ${
      enabled
        ? "bg-gray-100 text-gray-800"
        : "bg-gradient-to-l from-red-500 via-red-600 to-red-900 text-white"
    } shadow-lg rounded-2xl`}>
        <Toggle enabled={enabled} onToggle={() => {
            const newEnabled = !enabled;
            setEnabled(newEnabled);
            localStorage.setItem("theme", newEnabled ? "dark" : "light");
          }} className="absolute right-8 top-4" />

      <h1 className={`text-2xl font-bold mb-4 ${enabled?"text-black":"text-white"}`}>{track.title}</h1>

      <div className="space-y-3">
        <p><span className="font-semibold">Artist:</span> {track.artist}</p>
        <p><span className="font-semibold">Release Date:</span> {track.releaseDate}</p>
        <p><span className="font-semibold">Genre:</span> {track.genre}</p>
        <p><span className="font-semibold">Status:</span> {track.status}</p>
      </div>
    </div>  
    </div>
    
  );
}
