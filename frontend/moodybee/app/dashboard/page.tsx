import MoodBanner from "@/app/components/MoodBanner";
import MoodCalendar from "@/app/components/MoodCalendar";
import MoodCount from "@/app/components/MoodCount";
import QuoteCard from "@/app/components/QuoteCard";
import { IconPencil, IconBook, IconCirclePlus, IconDocument } from "@/app/components/icons";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard – Moodybee",
  description: "Track your daily mood",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white pb-36 sm:pb-40 overflow-x-hidden">
      {/* Banner is outside max-w wrapper so its background spans full width */}
      <MoodBanner />

      {/* Unified content area matching the Figma layout, constrained in center */}
      <div className="w-full mt-6 px-4 sm:mt-10 sm:px-8 flex flex-col gap-6 sm:flex-row sm:gap-6">
        {/* Calendar Column */}
        <div className="relative grid w-full grid-cols-1 lg:grid-cols-2 shadow-md bg-[#FDB813] rounded-[28px] overflow-hidden sm:w-[80%]">
          <MoodCalendar year={2026} month={2} /> {/* March */}
          {/* subtle divider line for desktop */}
          <div className="hidden lg:block w-px bg-[#E59400] absolute left-1/2 top-0 bottom-0" />
          <MoodCalendar year={2026} month={3} /> {/* April */}
        </div>

        {/* Bottom Nav Bar */}
        <div className="fixed bottom-0 left-0 right-0 w-full bg-white pb-6 pt-6 px-10 flex items-center justify-around z-50">
          <Link href="/diary" className="p-2 transition-transform hover:scale-110 active:scale-95 group">
            <IconBook className="h-[46px] w-[46px] sm:h-[56px] sm:w-[56px] text-[#7CCC29] stroke-[2px] group-hover:drop-shadow-sm" />
          </Link>
          <button className="p-2 transition-transform hover:scale-110 active:scale-95 group">
            <IconCirclePlus className="h-[60px] w-[60px] sm:h-[72px] sm:w-[72px] text-[#7CCC29] stroke-[2.5px] group-hover:drop-shadow-sm" />
          </button>
          <button className="p-2 transition-transform hover:scale-110 active:scale-95 group">
            <Link href="/journal" className="p-2 transition-transform hover:scale-110 active:scale-95 group">
              <IconDocument className="h-[46px] w-[46px] sm:h-[56px] sm:w-[56px] text-[#7CCC29] stroke-[2px] group-hover:drop-shadow-sm" />
            </Link>
          </button>
        </div>


        {/* Right column */}
        <div className="flex w-full flex-col gap-6 sm:w-[20%]">
          <MoodCount />
          <QuoteCard />
        </div>
      </div>
    </main>
  );
}
