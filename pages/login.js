import React from "react";
import { signIn } from "next-auth/react";

function login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <img
        className="w-52 mb-5 "
        src="https://links.papareact.com/9xl"
        alt="spotify"
      />

      <button
        onClick={() => signIn("spotify", { callbackUrl: "/" })}
        className="rounded-lg bg-slate-600 text-white p-4"
      >
        Login with Spotify
      </button>
    </div>
  );
}

export default login;
