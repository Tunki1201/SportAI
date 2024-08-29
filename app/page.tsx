"use client"
import { useState } from "react";
import Call from "./components/Call";
import Create from "./components/Create";

export default function Home() {
  const [room, setRoom] = useState<string | null>('')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-[#2e3e57]">

      {room ? (
        <div className="flex w-full">
          <div className="flex flex-col items-center justify-start" style={{position:'absolute', top:'6rem', left:'4rem'}}>
            <span className="text-white ltr:first-line:" style={{ fontSize: '24px' }}>
              Leicester vs Tottenham Premier League match
            </span>
            <span className="text-white" style={{ fontSize: '18px' }}>
              1&nbsp;:&nbsp;1
            </span>
            <iframe width="520" height="300" src="https://www.youtube.com/embed/AnWkefmi08s" frameBorder="0" allowFullScreen></iframe>

          </div>
          <Call
            room={room}
            setRoom={setRoom}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-2/4 rounded-xl bg-white px-24 pt-12 pb-24">
          <div className="flex items-center justify-center mb-12">
            <span style={{ fontSize: '24px' }}>
              Talk with SportAI
            </span>
          </div>
          <Create
            setRoom={setRoom}
          />
        </div>
      )}
    </main>
  );
}
