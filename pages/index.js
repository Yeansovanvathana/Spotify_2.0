import Center from "@/components/Center";
import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
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
