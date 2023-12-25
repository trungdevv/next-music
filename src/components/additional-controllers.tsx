"use client";
import { Volume2 } from "lucide-react";
import * as Progress from "@radix-ui/react-progress";
import { usePlayer } from "@/provider/track-player-provider";
import { Slider } from "./ui/slider";

export default function AdditionalControllers() {
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
      <button>
        <Volume2 size={15} className="text-gray" />
      </button>
      {/* <Progress.Root
        className="relative h-1 overflow-hidden rounded-full bg-slate-950 w-20"
        style={{ transform: "translateZ(0)" }}
        value={slider}
      >
        <Progress.Indicator
          className="bg-white h-full transition-transform grow duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
          style={{ transform: `translateX(-${100 - slider}%)` }}
          // onClick={(e) => {
          //   setSlider(parseInt(e.target.value));
          //   setDrag(parseInt(e.target.value));
          // }}
        />
      </Progress.Root> */}
      <Slider defaultValue={[35]} max={100} step={1} />
    </div>
  );
}
