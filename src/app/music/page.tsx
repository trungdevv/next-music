import { Metadata } from "next";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlbumArtwork } from "./components/album-artwork";
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder";
import { listenNowAlbums, madeForYouAlbums } from "./data/albums";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export default async function MusicPage() {
  async function myAction() {
    "use server";
    const session = await getServerSession(options);
    const accessToken = (session as any).accessToken;
    const res = await fetch(
      `https://api.spotify.com/v1/browse/new-releases?country=VN&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    // console.log(data?.albums?.items)
  }
  return (
    <>
      <div className="bg-background">
        <form action={myAction}>
          <Button></Button>
        </form>

        <div className="grid lg:grid-cols-5">
          <div className="col-span-3 lg:col-span-5 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              <Tabs defaultValue="music" className="h-full space-y-6">
                <div className="space-between flex items-center">
                  <TabsList>
                    <TabsTrigger value="music" className="relative">
                      Music
                    </TabsTrigger>
                    <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                    <TabsTrigger value="live" disabled>
                      Live
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent
                  value="music"
                  className="border-none p-0 outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Listen Now
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Top picks for you. Updated daily.
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4">
                        {listenNowAlbums.map((album) => (
                          <AlbumArtwork
                            key={album.name}
                            album={album}
                            className="w-[160px]"
                            aspectRatio="square"
                            width={160}
                            height={160}
                          />
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                  <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Made for You
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Your personal playlists. Updated daily.
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4">
                        {madeForYouAlbums.map((album) => (
                          <AlbumArtwork
                            key={album.name}
                            album={album}
                            className="w-[150px]"
                            aspectRatio="square"
                            width={150}
                            height={150}
                          />
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </TabsContent>
                <TabsContent
                  value="podcasts"
                  className="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        New Episodes
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Your favorite podcasts. Updated daily.
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <PodcastEmptyPlaceholder />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
