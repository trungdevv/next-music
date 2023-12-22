"use server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const topTracksIds = [
  "3M1q4U7wPgeeGkXSUdR4tj",
  "5xkx6TjnFxYnL5rWJg1oNO",
  "5zkc266PpfJo9eTPwepiKi",
  "7CAdT0HdiQNlt1C7xk2hep",
  "1Y7AZ3akqDipAyo6mmOQTy",
];
async function fetchWebApi(endpoint: string, method: string, body?: BodyInit) {
  const session = await getServerSession(options);
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
export async function getAlbum() {
  return await fetchWebApi(
    "v1/me/top/tracks?time_range=long_term&limit=5",
    "GET"
  );
}
export async function getRecommendations() {
  return await fetchWebApi(
    `v1/recommendations?limit=10&seed_tracks=${topTracksIds.join(",")}`,
    "GET"
  );
}
