import { Metadata } from "next";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlbumArtwork } from "../../components/track-item";
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder";


import { Track } from "@/types/types";
import { getAlbum, getRecommendations } from "@/actions/music";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export default async function MusicPage() {
  const listTopTrack = (await getAlbum().then((track) => track.items)) as Track[];
  const listRecommend  = (await getRecommendations().then((item)  => item.tracks )) as Track[];
  return (
    <>
      <div className="bg-background">
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
                      Top 5 tracks
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
                        {listTopTrack && listTopTrack.map((tracks) => (
                          <AlbumArtwork
                            key={tracks?.id}
                            className="w-[160px]"
                            aspectRatio="portrait"
                            width={160}
                            height={160}
                            track={tracks}
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
                      Recommend for you. Updated daily.
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4">
                      {listRecommend && listRecommend.map((tracks) => (
                          <AlbumArtwork
                            key={tracks?.id}
                            className="w-[160px]"
                            aspectRatio="portrait"
                            width={160}
                            height={160}
                            track={tracks}
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
