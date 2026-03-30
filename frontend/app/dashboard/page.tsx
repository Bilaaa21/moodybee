"use client";
import MoodBanner from "@/app/components/MoodBanner";
import MoodCalendar from "@/app/components/MoodCalendar";
import MoodCount from "@/app/components/MoodCount";
import QuoteCard from "@/app/components/QuoteCard";
import LogoutButton from "@/app/components/LogoutButton";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F8FAF5] pb-10">
      <MoodBanner />
      
      {/* Container Utama */}
      <div className="max-w-[1440px] mx-auto mt-10 px-8 flex flex-col lg:flex-row gap-8 justify-center items-start">
        
        {/* Kolom Kalender (Kiri) */}
        <div className="flex-1 w-full flex justify-center">
          <MoodCalendar /> 
        </div>

        {/* Kolom Kanan (Statistik, Quote, & Logout) */}
        <div className="w-full lg:w-[380px] flex flex-col gap-6">
          <MoodCount year={2026} month={3} />
          <QuoteCard />

          {/* Navigasi Logout - Nempel di bawah, rata kanan */}
          <div className="flex justify-end mt-4">
            <div className="w-fit"> 
               <LogoutButton />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}