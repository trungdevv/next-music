import Image from "next/image";
import { cn } from "@/lib/utils";
import PlayTrackButton from "./play-track-button";
import { Track } from "@/types/types";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  track: Track;
}

export function AlbumArtwork({
  aspectRatio = "portrait",
  width,
  height,
  className,
  track,
  ...props
}: AlbumArtworkProps) {
  console.log(aspectRatio)
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={track.album.images[0].url}
          alt={track.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-square" : "aspect-[3/4]"
          )}
        />
        <PlayTrackButton
          track={track}
          variant="filled"
          className="invisible w-12 h-12 text-3xl shadow-lg bottom-2 right-2 group/btn group-hover/item:visible"
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{track.name}</h3>
        <p className="text-xs text-muted-foreground"></p>
      </div>
    </div>
  );
}
