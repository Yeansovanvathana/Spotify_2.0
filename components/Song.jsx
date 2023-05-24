import React from "react";
import useSpotify from "@/hook/useSpotify";
import { milliesToMinuteAndSeconds } from "@/lib/time";

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  console.log("track", track);
  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img className="w-10 h-10" src={track.track.album.images[0].url} />

        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline">{track.track.album.name}</p>
        <p>{milliesToMinuteAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
