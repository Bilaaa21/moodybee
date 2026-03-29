"use client";

import { useState } from "react";
import { IconHappy, IconGood, IconNeutral, IconBad, IconSad } from "./icons";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MOODS = [
  { id: "happy", icon: IconHappy, color: "#7CCC29", label: "Happy" },
  { id: "good", icon: IconGood, color: "#8BC34A", label: "Good" },
  { id: "neutral", icon: IconNeutral, color: "#00BCD4", label: "Neutral" },
  { id: "bad", icon: IconBad, color: "#339AF0", label: "Bad" },
  { id: "sad", icon: IconSad, color: "#3F51B5", label: "Sad" },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

interface MoodCalendarProps {
  year?: number;
  month?: number;
}

export default function MoodCalendar({ year: propYear, month: propMonth }: MoodCalendarProps = {}) {
  const today = new Date();
  const year = propYear !== undefined ? propYear : today.getFullYear();
  const month = propMonth !== undefined ? propMonth : today.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const monthDate = new Date(year, month, 1);
  const monthName = monthDate.toLocaleString("en-US", { month: "long" });

  const [moods, setMoods] = useState<Record<string, string>>({});
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const handleDayClick = (day: number) => setSelectedDay(day);

  const handleMoodSelect = (moodKey: string) => {
    if (selectedDay === null) return;
    const key = `${year}-${month}-${selectedDay}`;
    setMoods((prev) => ({ ...prev, [key]: moodKey }));
    setSelectedDay(null);
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="relative w-full h-full flex flex-col bg-transparent">
      {/* Month Header / Darker Tab */}
      <div className="bg-[#E59400] py-3 text-center">
        <h2 className="text-[17px] font-extrabold text-[#222222]">
          {monthName}
        </h2>
      </div>

      <div className="px-4 pt-4 pb-6 sm:px-6 sm:pt-6">
        {/* Days of week */}
        <div className="mb-2 grid grid-cols-7 text-center">
          {DAYS.map((d) => (
            <span key={d} className="text-[11px] font-extrabold text-[#222222] sm:text-xs">
              {d}
            </span>
          ))}
        </div>

        {/* Calendar cells */}
        <div className="grid grid-cols-7 gap-y-3 sm:gap-y-4">
          {cells.map((day, idx) => {
            if (!day) return <div key={idx} />;
            const key = `${year}-${month}-${day}`;
            const selectedMoodStr = moods[key];
            const moodData = MOODS.find(m => m.id === selectedMoodStr);

            return (
              <button
                key={idx}
                onClick={() => handleDayClick(day)}
                className="flex flex-col items-center gap-1.5 transition-transform hover:scale-110"
              >
                {moodData ? (
                  <moodData.icon
                    className="h-[30px] w-[30px] sm:h-9 sm:w-9"
                    style={{ color: "#fff" }} // Draw the icon in white
                  />
                ) : (
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-white/60 text-[18px] font-medium text-white/80 transition-all hover:border-white hover:text-white sm:h-9 sm:w-9">
                    +
                  </span>
                )}
                <span className="text-[10px] font-extrabold text-[#222222] sm:text-[11px]">
                  {day}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mood Selector Modal */}
      {selectedDay !== null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10 transition-opacity p-4">
          <div className="w-[95%] max-w-sm rounded-[24px] bg-white p-5 sm:p-6 shadow-2xl">
            <p className="mb-4 text-center text-sm font-bold text-gray-800">
              How are you feeling on day {selectedDay}?
            </p>
            <div className="flex justify-between gap-2">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleMoodSelect(m.id)}
                  className="flex flex-col items-center gap-2 rounded-xl p-2 transition hover:bg-gray-100"
                >
                  <m.icon
                    className="h-10 w-10 sm:h-12 sm:w-12 stroke-[2px]"
                    style={{ color: m.color }}
                  />
                  <span className="text-[10px] font-bold capitalize text-gray-600">
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedDay(null)}
              className="mt-6 w-full rounded-xl bg-gray-100 py-3 text-center text-xs font-bold text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
