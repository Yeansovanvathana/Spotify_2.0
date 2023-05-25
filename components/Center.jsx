import {
  ArrowDownCircleIcon,
  ArrowLeftCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState } from "@/atoms/playlistAtom";
import { playlistState } from "@/atoms/playlistAtom";
import useSpotify from "@/hook/useSpotify";
import Songs from "./Songs";
import { signOut } from "next-auth/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong", err));
    }
  }, [spotifyApi, playlistId]);

  // console.log(playlist);
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide bg-[#121212] rounded-lg">
      <header className="absolute top-5 right-8 z-10 w-[72%]">
        <div className="flex justify-between">
          <div className="flex space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#2A292A] flex justify-center">
              <ChevronLeftIcon className="w-8 h-8 text-white p-1" />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#2A292A] flex justify-center">
              <ChevronRightIcon className="w-8 h-8 text-white p-1" />
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="bg-white items-center justify-center rounded-3xl text-center flex font-bold px-2 text-sm">
              <p className="">upgrade</p>
            </div>
            <div className=" text-white items-center justify-center rounded-3xl text-center flex bg-black opacity-70 px-2 text-sm">
              <ArrowDownCircleIcon className="w-8 h-8" />
              Install App
            </div>
            <div
              onClick={() => signOut()}
              className="opacity-90 hover:opacity-80 rounded-full bg-black"
            >
              <img
                src={session?.user.image}
                alt="profile picture"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      <section
        className={`flex items-end  space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div className=" bg-gradient-to-b from-black to-gray-900 h-full">
        <Songs />
      </div>
    </div>
  );
}

export default Center;
