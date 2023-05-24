import Center from "@/components/Center";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        {/* access token: {x} */}
        <Center />
      </main>
      {/* <div className="sticky bottom-0 h-24 w-full bg-red-100"> Play </div> */}
    </div>
  );
}
