import Center from "@/components/Center";
import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Vathana | Spotify</title>
        <link rel="icon" href="/icon (2).png" type="image/x-icon" />
      </Head>
      <main className="flex p-2">
        <Sidebar />
        {/* access token: {x} */}
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}
