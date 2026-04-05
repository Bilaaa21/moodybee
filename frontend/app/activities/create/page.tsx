"use client";
import React, { useState } from "react";
import { IconBook, IconCirclePlus, IconDocument } from "@/app/components/icons";
import Link from "next/link";
import {
  Bed,
  Utensils,
  BookOpen,
  Music,
  Sun,
  Coffee,
  Dumbbell,
  HeartPulse,
  Bike,
  Pencil,
  Gamepad2,
  ShoppingBag,
  Users,
  Plane,
  TreePine,
  Home,
  Stethoscope,
  Smile,
  Star,
  Moon,
  BookMarked,
  Tv2,
  UtensilsCrossed,
  Headphones,
  Dog,
  Bath,
  Baby,
  Glasses,
  Scissors,
  Flower2,
  Wind,
  Umbrella,
  LucideIcon,
} from "lucide-react";

const ALL_ACTIVITY_ICONS: { icon: LucideIcon; label: string }[] = [
  { icon: Bed, label: "Sleep" },
  { icon: Utensils, label: "Eat" },
  { icon: Dumbbell, label: "Exercise" },
  { icon: Music, label: "Music" },
  { icon: Sun, label: "Sunny" },
  { icon: Coffee, label: "Coffee" },
  { icon: HeartPulse, label: "Health" },
  { icon: BookOpen, label: "Read" },
  { icon: Bike, label: "Bike" },
  { icon: Pencil, label: "Write" },
  { icon: Gamepad2, label: "Gaming" },
  { icon: ShoppingBag, label: "Shop" },
  { icon: Users, label: "Friends" },
  { icon: Plane, label: "Travel" },
  { icon: TreePine, label: "Nature" },
  { icon: Home, label: "Home" },
  { icon: Stethoscope, label: "Doctor" },
  { icon: Smile, label: "Happy" },
  { icon: Star, label: "Star" },
  { icon: Moon, label: "Night" },
  { icon: BookMarked, label: "Study" },
  { icon: Tv2, label: "TV" },
  { icon: UtensilsCrossed, label: "Cook" },
  { icon: Headphones, label: "Listen" },
  { icon: Dog, label: "Pet" },
  { icon: Bath, label: "Relax" },
  { icon: Baby, label: "Family" },
  { icon: Glasses, label: "Class" },
  { icon: Scissors, label: "Haircut" },
  { icon: Flower2, label: "Skincare" },
  { icon: Wind, label: "Meditate" },
  { icon: Umbrella, label: "Rainy" },
];

export default function CreateActivityPage() {
  const [selectedIcons, setSelectedIcons] = useState<number[]>([]);

  const toggleIcon = (index: number) => {
    setSelectedIcons((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <main className="relative min-h-screen bg-white w-full pb-32 overflow-x-hidden font-sans">
      {/* Top Left Orange Badge */}
      <div className="absolute top-0 left-0 bg-[#ff7a00] rounded-br-[25px] sm:rounded-br-[35px] px-6 sm:px-10 py-5 z-20">
        <h1 className="text-white font-extrabold text-2xl tracking-wide">
          My Activities
        </h1>
      </div>

      {/* Top Right Back Button */}
      <div className="absolute top-6 right-6 sm:right-10 z-20">
        <Link
          href="/activities"
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-[3px] border-[#5ccc14] text-[#5ccc14] bg-white hover:bg-[#f6fff0] transition transform hover:scale-105"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </Link>
      </div>

      {/* Main Content */}
      <div className="pt-28 pb-10 px-4 sm:px-8 md:px-14 max-w-7xl mx-auto h-auto md:h-[calc(100vh-120px)] min-h-[800px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full items-stretch">

          {/* LEFT ICON PICKER */}
          <div className="bg-white rounded-[40px] border-[5px] sm:border-[6px] border-[#ff7a00] p-6 lg:p-8 flex flex-col h-full items-center shadow-[0px_4px_10px_rgba(0,0,0,0.05)] overflow-hidden">
            <p className="text-[#ff7a00] font-bold text-sm mb-4 self-start">
              Tap to select your activities
            </p>
            <div className="grid grid-cols-4 gap-2 w-full overflow-y-auto flex-1 pr-1">
              {ALL_ACTIVITY_ICONS.map(({ icon: Icon, label }, i) => {
                const isSelected = selectedIcons.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => toggleIcon(i)}
                    title={label}
                    className={`flex flex-col justify-center items-center gap-1 rounded-xl p-2 transition-all duration-200 active:scale-95
                      ${isSelected
                        ? "bg-[#ff7a00] shadow-sm"
                        : "bg-gray-50 hover:bg-orange-50"
                      }`}
                  >
                    <Icon
                      className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-200 ${isSelected ? "text-white" : "text-[#a0b5c9]"}`}
                      strokeWidth={1.5}
                    />
                    <span
                      className={`text-[8px] font-semibold truncate w-full text-center transition-colors duration-200 ${isSelected ? "text-white" : "text-gray-400"}`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col h-full gap-6">

            {/* Selected icons preview */}
            {selectedIcons.length > 0 && (
              <div className="bg-orange-50 rounded-[24px] border-[3px] border-[#ff7a00] px-5 py-3 flex flex-wrap gap-2 items-center">
                <span className="text-[#ff7a00] font-bold text-xs mr-1">Selected:</span>
                {selectedIcons.map((idx) => {
                  const { icon: Icon, label } = ALL_ACTIVITY_ICONS[idx];
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-1 bg-[#ff7a00] rounded-full px-2 py-1"
                    >
                      <Icon className="w-4 h-4 text-white" strokeWidth={2} />
                      <span className="text-white text-[10px] font-semibold">{label}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Write Down Box */}
            <div className="bg-white rounded-[30px] border-[4px] border-[#ff7a00] p-5 flex flex-col flex-[0.5] shadow-[0px_4px_10px_rgba(0,0,0,0.05)] relative">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-[#ff7a00] font-black text-base sm:text-lg">
                  Write down about your activities
                </h2>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-[#5ccc14] shrink-0 transform -rotate-12"
                >
                  <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                </svg>
              </div>
              <textarea
                className="w-full flex-1 resize-none bg-transparent border-0 outline-none text-gray-700 text-sm placeholder-gray-300 font-medium leading-relaxed border-b-[2px] border-gray-200 focus:border-[#ff7a00] transition-colors duration-200 pb-1"
                placeholder="Type your activity notes here..."
                rows={3}
              />
            </div>

            {/* Upload Box */}
            <div className="bg-white rounded-[30px] border-[4px] border-[#ff7a00] p-5 flex flex-col flex-[0.6] shadow-[0px_4px_10px_rgba(0,0,0,0.05)] relative">
              <h2 className="text-[#ff7a00] font-black text-base sm:text-lg">
                Wanna up a picture?
              </h2>

              <div className="flex-1 flex items-center justify-center pt-4">
                <button className="bg-[#ff7a00] hover:bg-[#e66c00] text-white font-bold text-base sm:text-lg py-2 px-10 rounded-[16px] transition transform hover:scale-105">
                  Upload
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button className="bg-[#ff7a00] hover:bg-[#e66c00] text-white font-black text-base sm:text-lg py-3 rounded-[16px] w-full transition shrink-0 transform hover:scale-[1.02]">
              Save
            </button>

          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white pb-4 pt-4 px-10 flex items-center justify-around z-50 border-t border-gray-100">
        <Link href="/diary" className="p-2 transition-transform hover:scale-110 active:scale-95 group">
          <IconBook className="h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] text-[#7CCC29] stroke-[2px] group-hover:drop-shadow-sm" />
        </Link>
        <Link href="/dashboard" className="p-2 transition-transform hover:scale-110 active:scale-95 group">
          <IconCirclePlus className="h-[48px] w-[48px] sm:h-[58px] sm:w-[58px] text-[#7CCC29] stroke-[2.5px] group-hover:drop-shadow-sm" />
        </Link>
        <Link href="/activities" className="p-2 transition-transform hover:scale-110 active:scale-95 group">
          <IconDocument className="h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] text-[#7CCC29] stroke-[2px] group-hover:drop-shadow-sm" />
        </Link>
      </div>
    </main>
  );
}
