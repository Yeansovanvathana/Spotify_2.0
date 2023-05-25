import useSpotify from "@/hook/useSpotify";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import { useRecoilState } from "recoil";
import useSongInfo from "@/hook/useSongInfo";
import {
  ArrowsRightLeftIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/solid";
import { useCallback } from "react";
import { debounce } from "lodash";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackID] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now Playing", data.body?.item);
        setCurrentTrackID(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 500),
    []
  );

  return (
    <div className="h-24 bg-black text-white grid grid-cols-3 text-sm md:text-base px-2 md:px-8">
      {/* left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
          alt="image"
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* center */}
      <div className="flex  items-center  justify-evenly">
        <ArrowsRightLeftIcon className="button" />
        <BackwardIcon className="button" />
        {isPlaying ? (
          <PauseCircleIcon
            onClick={handlePlayPause}
            className="button h-10 w-10"
          />
        ) : (
          <PlayCircleIcon
            onClick={handlePlayPause}
            className="button h-10 w-10"
          />
        )}
        <ForwardIcon className="button" />
        <ArrowsRightLeftIcon className="button" />
      </div>
      {/* right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <SpeakerXMarkIcon
          className="button"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <SpeakerWaveIcon
          className="button"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  );
}

export default Player;
