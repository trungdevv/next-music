"use client";


import { useStore } from "@/provider/zustand";
import AdditionalControllers from "./additional-controllers";
import MainControllers from "./main-controllers";
import PlayerTrackInfo from "./player-track-info";

export default function PreviewPlayer() {
  const { currentTrack } = useStore();

  if (!currentTrack) {
    return null;
  }

  return (
    <footer
      // className="grid items-center justify-between grid-cols-12 p-3 bg-red-900"
      className={`sticky bottom-0 grid grid-cols-12 gap-12 bg-background items-center justify-between px-5 ${
        currentTrack ? "py-3" : "py-0"
      }`}
    >
      <PlayerTrackInfo currentTrack={currentTrack} />
      <MainControllers />
      <AdditionalControllers />
    </footer>
  );
}
