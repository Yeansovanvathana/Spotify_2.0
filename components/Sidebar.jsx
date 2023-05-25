import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  MagnifyingGlassCircleIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "@/hook/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "@/atoms/playlistAtom";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlistData, setPlaylistData] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylistData(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  console.log(playlistData);
  // console.log(playlistId);

  return (
    <div className="pb-36 text-gray-400 pr-2 text-md font-medium border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen max-w-[25rem] hidden md:inline-flex">
      <div className="w-[21rem]">
        <div className="space-y-4 bg-[#121212] p-4 rounded-lg">
          <button className="flex item-center space-x-3 hover:text-white">
            <HomeIcon className="w-7 h-7" />
            <p>Home</p>
          </button>
          <button className="flex item-center space-x-3 hover:text-white">
            <MagnifyingGlassIcon className="w-7 h-7" />
            <p>Search</p>
          </button>
        </div>
        <div className=" bg-[#121212] rounded-lg mt-2 h-full">
          <div className="p-4">
            <button className="flex justify-between items-center  hover:text-white w-full">
              <div className="flex items-center space-x-3">
                <BuildingLibraryIcon className="w-7 h-7" />
                <p>Your Library</p>
              </div>
              <div className="flex items-center space-x-3">
                <PlusIcon className="w-5 h-5" />
                <ArrowRightIcon className="w-5 h-5" />
              </div>
            </button>
          </div>
          <div className="flex space-x-2 px-4">
            <div className="bg-[#2A292A] text-white items-center justify-center rounded-3xl text-center flex px-2 py-1 text-sm">
              <p className="">Playlist</p>
            </div>
            <div className="bg-[#2A292A] text-white items-center justify-center rounded-3xl text-center flex px-2 py-1 text-sm">
              <p className="">Artists</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4">
            <MagnifyingGlassIcon className="w-5 h-5" />
            <div className="flex items-center space-x-2">
              <p className="text-sm">Recents</p>
              <ChevronDownIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="p-2">
            {playlistData.map((playlist) => (
              <div
                key={playlist.id}
                className="flex space-x-3 hover:bg-gray-900 rounded-lg p-2"
                onClick={() => setPlaylistId(playlist.id)}
              >
                <img
                  className="w-10 h-10"
                  src={playlist?.images?.[0]?.url}
                  alt=""
                />
                <div className="">
                  <p
                    onClick={() => setPlaylistId(playlist.id)}
                    className="cursor-pointer hover:text-white"
                  >
                    {playlist.name}
                  </p>
                  <p className="cursor-pointer hover:text-white text-sm">
                    {playlist?.owner.display_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
