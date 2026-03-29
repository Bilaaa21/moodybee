"use client";

import { IconHappy, IconGood, IconNeutral, IconBad, IconSad } from "./icons";

const moods = [
  { id: "happy", icon: IconHappy, label: "Happy" },
  { id: "good", icon: IconGood, label: "Good" },
  { id: "neutral", icon: IconNeutral, label: "Neutral" },
  { id: "bad", icon: IconBad, label: "Bad" },
  { id: "sad", icon: IconSad, label: "Sad" },
];

export default function MoodBanner() {
  const dateStr = "15 Maret 2026";

  return (
    <div className="w-full bg-[#7CCC29] text-white rounded-b-[40px] shadow-md">
      {/* Wrapper to align banner content exactly with the max-w-5xl grid below */}
      <div className="mx-auto max-w-5xl px-6 pt-6 pb-8 sm:px-10 sm:pt-8 sm:pb-10">
        {/* Header text row */}
        <div className="flex flex-col items-center justify-between text-center gap-2 sm:flex-row sm:text-left">
          <p className="text-sm font-bold sm:text-lg">
            Welcome, Martin&apos;s girl!
          </p>
          <p className="text-xs font-bold sm:text-sm">
            Samarinda, {dateStr}
          </p>
        </div>

        {/* Mood icons row */}
        <div className="max-w-xl mx-auto mt-6 flex items-center justify-between gap-4 sm:mt-8">
          {moods.map((mood) => (
            <button
              key={mood.id}
              className="flex flex-col items-center gap-2 transition-transform hover:scale-110 active:scale-95 text-white"
            >
              <mood.icon className="h-12 w-12 sm:h-[60px] sm:w-[60px] stroke-[2.5px] drop-shadow-sm" />
              <span className="text-[10px] font-extrabold tracking-wide sm:text-xs">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
