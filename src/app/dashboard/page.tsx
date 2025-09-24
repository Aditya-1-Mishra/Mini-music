"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toggle from '@/app/components/toggle';
import Searchbar from '@/app/components/searchbar';
import Image from 'next/image';

interface Track {
  id: number;
  title: string;
  artist: string;
  releaseDate: string;
  status: string;
  genre?: string;
}

interface Filter {
  field: "title" | "artist" | "genre";
  value: string;
}

export default function Dashboard() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [filters, setFilters] = useState<Filter[] | null>(null);
  const [applyFilters, setApplyFilters] = useState(false); // new state to track apply boolean
  const [enabled, setEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const router = useRouter();

  // Fetch all tracks on mount
  useEffect(() => {
    async function fetchTracks() {
      const res = await fetch("/api/tracks");
      const data = await res.json();
      setTracks(data);
      setFilteredTracks(data); // show all tracks initially
    }
    fetchTracks();
  }, []);

  // Apply filters only when applyFilters is true
  useEffect(() => {
    if (!applyFilters || !filters) {
      setFilteredTracks(tracks); // show all tracks
      return;
    }

    let temp = [...tracks];
    filters.forEach((filter) => {
      if (filter.value.trim() !== "") {
        temp = temp.filter(track =>
          track[filter.field]?.toLowerCase().includes(filter.value.toLowerCase())
        );
      }
    });
    setFilteredTracks(temp);
  }, [filters, applyFilters, tracks]);

  return (
    <div className={`${enabled?"bg-gradient-to-r from-white to-red-700":"bg-gradient-to-l from-gray-400 to-gray-600"} min-h-screen p-8 transition-colors duration-500`}>
      
      <Toggle 
        enabled={enabled} 
        onToggle={() => {
          const newEnabled = !enabled;
          setEnabled(newEnabled);
          localStorage.setItem("theme", newEnabled ? "dark" : "light");
        }}
        className="absolute right-8 top-4" 
      />

      <h1 className={`text-2xl ${enabled?"text-black":"text-white"} font-bold mb-4`}>Dashboard</h1>

      
      <Searchbar 
        enabled={enabled} 
        onFilterChange={(payload) => {
          if (!payload) {
            setFilters(null);
            setApplyFilters(false);
            return;
          }
          setFilters(payload.filters);
          setApplyFilters(payload.apply);
        }} 
      />

     {/* Table container */}


<div className="rounded-lg p-4">
  <table className="w-full border-separate border-spacing-y-2">



    {/* Header of the table */}
    <thead className={`${enabled ? "bg-gray-100 text-gray-800" : "bg-gradient-to-l from-red-500 via-red-600 to-red-900 text-white"} font-bold rounded-t-lg`}>
      <tr>
        <th className="p-3 text-left">Track Title</th>
        <th className="p-3 text-left">Artist Name</th>
        <th className="p-3 text-left">Release Date</th>
        <th className="p-3 text-left">Status</th>
      </tr>
    </thead>

    {/* Scrollable rows */}
    <tbody className="overflow-y-auto max-h-96 scroll-hidden">
      {filteredTracks.map((track) => (
        <tr
          key={track.id}
          className={`${enabled ? "bg-gray-400 even:bg-white even:text-black odd:text-white hover:bg-gray-300 transition-colors" : "bg-red-50 even:bg-red-100 text-red-900 hover:bg-red-200 transition-colors"} rounded-lg shadow transition-colors`}
          onClick={() => router.push(`/track/${track.id}`)}
          style={{ cursor: "pointer" }}
        >
          <td className="p-2 rounded-l-lg">{track.title}</td>
          <td className="p-2">{track.artist}</td>
          <td className="p-2">{track.releaseDate}</td>
          <td className="p-2 rounded-r-lg">{track.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      <Image 
        src="/addon.svg" alt="addon image" className="absolute right-10 bottom-12 hover:scale-110 transition-transform duration-300 cursor-pointer" 
        width={50} height={50} onClick={()=>router.push("/upload")} 
      />
    </div>
  );
}
