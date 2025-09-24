"use client";

import { useState } from "react";

interface Filter {
  field: "title" | "artist" | "genre";
  value: string;
}

interface SearchbarProps {
  enabled: boolean; // received from parent
  onFilterChange: (payload: { filters: Filter[]; apply: boolean } | null) => void;
}

export default function Searchbar({ enabled, onFilterChange }: SearchbarProps) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");

  const handleSearch = () => {
    if (!title && !artist && !genre) {
      onFilterChange({ filters: [], apply: false }); // reset to show all
      return;
    }

    const filters: Filter[] = [];
    if (title) filters.push({ field: "title", value: title });
    if (artist) filters.push({ field: "artist", value: artist });
    if (genre) filters.push({ field: "genre", value: genre });

    onFilterChange({ filters, apply: true }); // send object with apply = true
  };

  return (
    <div className="flex gap-4 mb-4 ml-5 mt-5">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Search Title"
        className={`w-36 p-2 border rounded-lg focus:outline-none focus:ring-2 ${
          enabled
            ? " text-black font-bold border-black focus:ring-red-300"
            : " text-white font-bold border-gray-300 focus:ring-white"
        }`}
      />
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Search Artist"
        className={`w-36 p-2 border rounded-lg focus:outline-none focus:ring-2 ${
          enabled
            ? " text-black font-bold border-black focus:ring-red-300"
            : " text-white font-bold border-gray-300 focus:ring-white"
        }`}
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Search Genre"
        className={`w-36 p-2 border rounded-lg focus:outline-none focus:ring-2 ${
          enabled
            ? " text-black font-bold border-black focus:ring-red-300"
            : " text-white font-bold border-gray-300 focus:ring-white"
        }`}
      />
      <button
        className={`${
          enabled
            ? "bg-gray-600 text-white hover:bg-gray-800"
            : "bg-red-700 text-white hover:bg-red-800"
        } rounded-lg h-10 w-15 cursor-pointer`}
        onClick={handleSearch}
      >
        search
      </button>
    </div>
  );
}
