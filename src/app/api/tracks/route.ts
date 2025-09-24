import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define Track type
type Track = {
  id: number;
  title: string;
  artist: string;
  genre?: string;
  releaseDate: string;
  status: "Draft" | "Published";
};

// File path to store tracks
const filePath = path.join(process.cwd(), "tracks.json");

// Helper: Read tracks from file
function readTracks(): Track[] {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data) as Track[];
}

// Helper: Write tracks to file
function writeTracks(tracks: Track[]) {
  fs.writeFileSync(filePath, JSON.stringify(tracks, null, 2));
}

// GET handler: return all tracks
export async function GET() {
  const tracks = readTracks();
  return NextResponse.json(tracks);
}

// POST handler: add a new track
export async function POST(req: Request) {
  const data = await req.json();

  // Basic validation
  if (!data.title || !data.artist || !data.releaseDate || !data.status) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const tracks = readTracks();
  const newTrack: Track = {
    id: tracks.length + 1,
    title: data.title,
    artist: data.artist,
    genre: data.genre,
    releaseDate: data.releaseDate,
    status: data.status,
  };

  tracks.push(newTrack);
  writeTracks(tracks);

  return NextResponse.json(newTrack, { status: 201 });
}
