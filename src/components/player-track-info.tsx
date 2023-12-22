import { Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RxHeartFilled } from "react-icons/rx";
import { Track } from "../types/types";

interface IProps {
  currentTrack: Track;
}

export default function PlayerTrackInfo({ currentTrack }: IProps) {
  return (
    <div className="flex items-center gap-3">
      {currentTrack.album ? (
        <Image
          src={currentTrack.album.images[0].url}
          alt={currentTrack.name}
          height={36}
          width={36}
          className="object-cover rounded-lg aspect-square"
        />
      ) : (
        <Music size={56} />
      )}
      <div className="max-w-[150px]">
        <p className="text-xs font-semibold text-white truncate">
          {currentTrack?.name}   {currentTrack?.name}   {currentTrack?.name}   {currentTrack?.name}
        </p>
        <Link
          href={`/artist/${currentTrack?.artists[0].id}`}
          className="text-xs text-gray"
        >
          {currentTrack?.artists[0].name}
        </Link>
      </div>
    </div>
  );
}
