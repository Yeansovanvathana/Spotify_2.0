import { useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

function useSpotify() {
  const { data: session } = useSession();
  //   console.log("hiii", session);
  useEffect(() => {
    if (session) {
      spotifyApi.setAccessToken(session.accessToken);
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
