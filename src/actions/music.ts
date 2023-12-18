"use server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

async function fetchWebApi(endpoint: string, method: string, body?: BodyInit) {
  const session = await getServerSession(options);
  console.log(session)
  const accessToken = (session as any).accessToken;
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}
export default async function getAlbum() {
  return await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=5", "GET");
}

