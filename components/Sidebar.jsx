import React from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  MagnifyingGlassCircleIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="text-gray-500 p-5 text-sm">
      <div className="space-y-4">
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
        <p className="cursor-pointer hover:text-white">Playlist name..</p>
        <p className="cursor-pointer hover:text-white">Playlist name..</p>
        <p className="cursor-pointer hover:text-white">Playlist name..</p>
        <p className="cursor-pointer hover:text-white">Playlist name..</p>
        <p className="cursor-pointer hover:text-white">Playlist name..</p>
        <p className="cursor-pointer hover:text-white">Playlist name..</p>
        <p className="cursor-pointer hover:text-white">Playlist name..</p>
        <p className="cursor-pointer hover:text-white">Playlist name..</p>
        <p className="cursor-pointer hover:text-white">Playlist name..</p>
        <p className="cursor-pointer hover:text-white">Playlist name..</p>
        <p className="cursor-pointer hover:text-white">Playlist name..</p>
        <p className="cursor-pointer hover:text-white">Playlist name..</p>
      </div>
    </div>
  );
};
export default Sidebar;
