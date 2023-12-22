"use client";

import { usePlayer } from "@/provider/track-player-provider";
import { fmtMSS } from "@/utils/clientUtils";
import * as Progress from "@radix-ui/react-progress";
import { Repeat2, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { MdPause, MdPlayArrow } from "react-icons/md";

export default function MainControllers() {
  const {
    isPlaying,
    setSlider,
    setDrag,
    togglePlay,
    duration,
    currentTime,
    slider,
  } = usePlayer();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-5">
        <button>
          <Shuffle size={16} className="text-gray" />
        </button>
        <button>
          <SkipBack size={18} className="text-xl text-gray" />
        </button>
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-8 h-8 p-0 text-black bg-white rounded-full focus:outline-none"
        >
          {isPlaying ? (
            <MdPause className="text-2xl text-paper-700" />
          ) : (
            <MdPlayArrow className="text-2xl text-paper-700" />
          )}
        </button>
        <button>
          <SkipForward size={18} className="text-gray" />
        </button>
        <button>
          <Repeat2 size={16} className="text-gray" />
        </button>
      </div>
      <div className="flex items-center justify-center gap-3">
        <span className="text-xs text-gray w-8 items-center">
          {currentTime ? fmtMSS(currentTime * 1000) : "0:00"}
        </span>
        <Progress.Root
          className="relative h-1 overflow-hidden rounded-full bg-slate-950 w-96"
          style={{ transform: "translateZ(0)" }}
          value={slider}
        >
          <Progress.Indicator
            className="bg-white h-full transition-transform grow duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
            style={{ transform: `translateX(-${100 - slider}%)` }}
          />
        </Progress.Root>
        <span className="text-xs text-gray w-8 items-center">
          {duration ? fmtMSS(duration * 1000) : "0:00"}
        </span>
      </div>
    </div>
  );
}
