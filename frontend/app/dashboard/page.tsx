import MoodBanner from "@/app/components/MoodBanner";
import MoodCalendar from "@/app/components/MoodCalendar";
import MoodCount from "@/app/components/MoodCount";
import QuoteCard from "@/app/components/QuoteCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard – Daylio",
  description: "Track your daily mood",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white pb-10 overflow-x-hidden">
      {/* Banner is outside max-w wrapper so its background spans full width */}
      <MoodBanner />

      {/* Unified content area matching the Figma layout, constrained in center */}
      <div className="w-full mt-6 px-4 sm:mt-10 sm:px-8 flex flex-col gap-6 sm:flex-row sm:gap-6">
        {/* Calendar Column */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 sm:w-[80%]">
          <MoodCalendar year={2026} month={2} /> {/* March */}
          <MoodCalendar year={2026} month={3} /> {/* April */}
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
