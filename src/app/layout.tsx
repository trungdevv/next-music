import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/session-provider";
import { Menu } from "../components/menu";
import { Sidebar } from "./music/components/sidebar";
import { playlists } from "./music/data/playlists";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ height: "100%" }}
        suppressHydrationWarning={true}
      >
        <SessionProvider session={session}>
          {session ? (
            <div>
              <Menu />
              <div className="flex mt-14 container mx-auto px-4">
                <div className="h-screen w-[20%] self-start relative">
                  <div className="fixed">
                    <Sidebar
                      playlists={playlists}
                      className="hidden lg:block"
                    />
                    {/* abcxyz */}
                  </div>
                </div>

                <main className="w-[80%]">{children}</main>
              </div>
            </div>
          ) : (
            <>{children}</>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
