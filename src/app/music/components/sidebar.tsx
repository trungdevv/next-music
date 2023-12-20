import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Playlist } from "../data/playlists";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

export async function Sidebar({ className, playlists }: SidebarProps) {
  const session = await getServerSession();
  return (
    <div className={cn("", className)}>
      <div className="space-y-4 py-4">
        <div className="flex items-center px-7 py-2">
          <Avatar>
            <AvatarImage src={session?.user?.image ?? ""} />
            <AvatarFallback>hi</AvatarFallback>
          </Avatar>
          <p className="px-4 font-semibold tracking-tight">
            {session?.user?.name}
          </p>
        </div>

        <div className="px-3 py-2 flex flex-col">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Library
          </h2>
          <div className="space-y-1 flex flex-col">
            <Button variant="ghost" className="justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
              </svg>
              Playlists
            </Button>
            <Button variant="ghost" className="justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <circle cx="8" cy="18" r="4" />
                <path d="M12 18V2l7 4" />
              </svg>
              Made for You
            </Button>
            <Button variant="ghost" className="justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <circle cx="8" cy="18" r="4" />
                <path d="M12 18V2l7 4" />
              </svg>
              Made for You
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
