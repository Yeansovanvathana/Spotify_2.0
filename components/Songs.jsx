import { playlistState } from "@/atoms/playlistAtom";
import React from "react";
import { useRecoilValue } from "recoil";
import Song from "./Song";

function Songs() {
  const playlist = useRecoilValue(playlistState);
  console.log(playlist);
  return (
    <div className="flex flex-col space-y-1 pb-28 text-white">
      {playlist?.tracks.items.map((track, i) => (
        <Song key={track.track.id} track={track} order={i} />
        // <div>{track.track.id}</div>
      ))}
    </div>
  );
}

export default Songs;
