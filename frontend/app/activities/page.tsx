"use client";
import React from "react";
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
} from "lucide-react";

// Daylio-style activity icons sets
const ACTIVITY_ICONS_SET_1 = [Bed, Utensils, Dumbbell, Music, Sun, Coffee, HeartPulse, BookOpen];
const ACTIVITY_ICONS_SET_2 = [Bike, Pencil, Gamepad2, ShoppingBag, Users, Plane, TreePine, Home];
const ACTIVITY_ICONS_SET_3 = [Stethoscope, Smile, Star, Moon, BookMarked, Tv2, UtensilsCrossed, Headphones];

export default function ActivitiesPage() {
  const loremText =
    "lorem ipsum color det sit amor widhi pacar martin jadi semua burger milik Allah dan sungai Amazon adalah sungai terbesar di dunia.";

  return (
    <main className="relative min-h-screen bg-white w-full pb-32 overflow-x-hidden font-sans">
      {/* Top Left Orange Badge */}
      <div className="absolute top-0 left-0 bg-[#ff7a00] rounded-br-[25px] sm:rounded-br-[35px] px-6 sm:px-10 py-5 z-20">
        <h1 className="text-white font-extrabold text-2xl tracking-wide">
          My Activities
        </h1>
      </div>

      {/* Top Right Add Button */}
      <div className="absolute top-6 right-6 sm:right-10 z-20">
        <Link
          href="/activities/create"
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-[3px] border-[#5ccc14] text-[#5ccc14] bg-white hover:bg-[#f6fff0] transition transform hover:scale-105"
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </Link>
      </div>

      {/* Main Content (Cards) */}
      <div className="pt-32 pb-10 px-4 sm:px-8 md:px-14 max-w-8xl mx-auto flex flex-col gap-10">

        {/* Red Card */}
        <div className="flex bg-white rounded-[40px] border-[5px] sm:border-[6px] border-[#fb2828] w-full p-6 sm:p-8 md:p-10 shadow-[8px_10px_15px_rgba(0,0,0,0.15)] items-stretch">
          <div className="w-[45%] flex items-center pr-2 sm:pr-8">
            <ActivityIconGrid icons={ACTIVITY_ICONS_SET_1} />
          </div>
          <div className="w-[55%] flex items-center justify-end">
            <p className="text-right text-[#fb2828] font-black text-lg sm:text-[20px] md:text-[23px] leading-tight">
              {loremText}
            </p>
          </div>
        </div>

        {/* Orange Card */}
        <div className="flex bg-white rounded-[40px] border-[5px] sm:border-[6px] border-[#ff7a00] w-full p-6 sm:p-8 md:p-10 shadow-[8px_10px_15px_rgba(0,0,0,0.15)] items-stretch">
          <div className="w-[45%] flex items-center pr-2 sm:pr-8">
            <ActivityIconGrid icons={ACTIVITY_ICONS_SET_2} />
          </div>
          <div className="w-[55%] flex items-center justify-end">
            <p className="text-right text-[#ff7a00] font-black text-lg sm:text-[20px] md:text-[23px] leading-tight">
              {loremText}
            </p>
          </div>
        </div>

        {/* Green Card */}
        <div className="flex bg-white rounded-[40px] border-[5px] sm:border-[6px] border-[#5ccc14] w-full p-6 sm:p-8 md:p-10 shadow-[8px_10px_15px_rgba(0,0,0,0.15)] items-stretch">
          <div className="w-[45%] flex items-center pr-2 sm:pr-8">
            <ActivityIconGrid icons={ACTIVITY_ICONS_SET_3} />
          </div>
          <div className="w-[55%] flex items-center justify-end">
            <p className="text-right text-[#5ccc14] font-black text-lg sm:text-[20px] md:text-[23px] leading-tight">
              {loremText}
            </p>
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

// Props-based icon grid with real Lucide icons
const ActivityIconGrid = ({ icons }: { icons: React.ElementType[] }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-x-2 sm:gap-x-4 gap-y-6 w-full max-w-[250px]">
      {icons.map((Icon, i) => (
        <div key={i} className="flex justify-center items-center">
          <Icon
            className="w-8 h-8 sm:w-10 sm:h-10"
            color="#a0b5c9"
            strokeWidth={1.5}
          />
        </div>
      ))}
    </div>
  );
};
