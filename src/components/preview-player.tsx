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
      className={`fixed bottom-0 left-0 right-0 bg-[#CCC] border-t ${
        currentTrack ? "py-3" : "py-0"
      }`}
    >
      <div className="container max-w-screen-xl flex justify-center gap-5">
        <MainControllers />
        <PlayerTrackInfo currentTrack={currentTrack} />
        <AdditionalControllers />
      </div>
    </footer>
  );
}
