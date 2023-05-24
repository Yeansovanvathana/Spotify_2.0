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

  // console.log(playlistData);
  // console.log(playlistId);

  return (
    <div className="text-gray-500 p-5 text-xl lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[13rem] lg:max-w-[15rem] hidden md:inline-flex">
      <div className="space-y-4">
        <button onClick={() => signOut()} className="hover:text-white">
          <p>Logout</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <MagnifyingGlassCircleIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <BuildingLibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"></hr>

        <button className="flex item-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Creat Playlist</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"></hr>

        {/* Playlist */}
        {playlistData.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
