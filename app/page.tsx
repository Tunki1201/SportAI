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
          <div
            className="flex flex-col items-center justify-start absolute lg:top-24 lg:left-16 md:top-20 md:left-12 sm:top-16 sm:left-8 top-12 left-4"
          >
            <span className="text-white text-2xl overflow-hidden border-r-2 border-white whitespace-nowrap animate-typing">
              Leicester vs Tottenham Premier League match
            </span>
            <span className="text-white text-lg">1&nbsp;:&nbsp;1</span>
            <iframe
              width="520"
              height="300"
              src="https://www.youtube.com/embed/AnWkefmi08s"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <Call room={room} setRoom={setRoom} />
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
