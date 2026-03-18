"use client";

import { IconHappy, IconGood, IconNeutral, IconBad, IconSad } from "./icons";

const MOOD_DATA = [
  { id: "happy", icon: IconHappy, label: "Happy", count: 3, color: "#FFB000" },
  { id: "good", icon: IconGood, label: "Good", count: 5, color: "#74CD28" },
  { id: "neutral", icon: IconNeutral, label: "Neutral", count: 10, color: "#00BCD4" },
  { id: "bad", icon: IconBad, label: "Bad", count: 5, color: "#339AF0" },
  { id: "sad", icon: IconSad, label: "Sad", count: 8, color: "#3F51B5" },
];

export default function MoodCount() {
  return (
    <div className="w-full rounded-[28px] border-[5px] border-[#FDB813] bg-white shadow-md overflow-hidden flex flex-col pt-6 pb-6 sm:pt-8 sm:pb-8">
      
      {/* Decorative arc — perfect half circle */}
      <div className="relative mx-auto flex h-[80px] w-[160px] items-start justify-center overflow-hidden sm:h-[100px] sm:w-[200px]">
        {/* We use a square container 2x height, rounded full */}
        <div
          className="absolute top-0 h-[160px] w-[160px] rounded-full border-[14px] border-[#FDB813] sm:h-[200px] sm:w-[200px] sm:border-[16px]"
        />
      </div>

      {/* Under arc content container */}
      <div className="w-full px-5 mt-3 sm:px-8">
        
        <h3 className="text-center text-[15px] font-extrabold text-[#FDB813] sm:text-[18px] mb-4 tracking-wide">
          Mood Count
        </h3>

        {/* Divider line bridging the arc base */}
        <div className="w-full h-[2px] bg-gray-200 mb-5 sm:mb-6" />

        {/* Emojis with custom SVGs */}
        <div className="flex items-start justify-between">
          {MOOD_DATA.map((m) => (
            <div key={m.id} className="flex flex-col items-center gap-1.5 sm:gap-2">
              <m.icon
                className="h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] stroke-[2px]"
                style={{ color: m.color }}
              />
              <span 
                className="text-[9px] font-bold text-gray-500 sm:text-[11px]"
              >
                {m.label}
              </span>
              <span
                className="flex h-[18px] w-[32px] items-center justify-center rounded-xl text-[11px] font-extrabold text-white sm:h-[22px] sm:w-[38px] sm:text-[12px]"
                style={{ background: m.color }}
              >
                {m.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
