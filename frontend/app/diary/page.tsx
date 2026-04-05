import { IconPencil, IconBook, IconCirclePlus, IconDocument } from "@/app/components/icons";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diary – Moodybee",
  description: "Track your diaries",
};

export default function DiaryPage() {
  return (
    <main className="min-h-screen bg-white pb-32 relative overflow-x-hidden flex flex-col">
      {/* Header Widget "My Diaries" */}
      <div className="flex justify-start w-full">
        <div className="bg-[#FDB813] text-white font-extrabold tracking-wide text-[22px] px-10 pt-6 pb-6 rounded-br-[36px] shadow-sm lg:px-16 lg:pt-8 lg:pb-8 lg:text-3xl lg:rounded-br-[48px]">
          My Diaries
        </div>
      </div>

      {/* Main Content Container centered */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 mt-12 sm:mt-16 flex-1">

        {/* Input Box "What's on your mind?" – clicks navigate to /journal */}
        <Link href="/journal" className="block w-full">
          <div className="w-full border-[8px] border-[#7CCC29] py-8 px-6 sm:px-10 rounded-[36px] sm:rounded-[50px] shadow-sm mb-16 relative flex items-center bg-white cursor-text transition-transform hover:scale-[1.01]">
            <div className="w-full flex items-end justify-between border-b-[2px] border-[#333333] pb-1.5 px-2">
              <span className="w-full text-[15px] sm:text-[17px] font-semibold text-[#555555] pt-2 select-none">
                What&apos;s on your mind?
              </span>
              <IconPencil className="h-[22px] w-[22px] text-[#7CCC29] flex-shrink-0 mb-1 ml-4 stroke-[2.5px]" />
            </div>
          </div>
        </Link>

        {/* Diary Collection Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pb-16 pt-4">
          {['Koleksi Diaries A', 'Koleksi Diaries B', 'Koleksi Diaries C'].map((title, idx) => (
            <Link
              href={`/diary/${idx + 1}`}
              key={idx}
              className="w-full h-[190px] sm:h-[220px] bg-white rounded-[32px] sm:rounded-[44px] flex items-center justify-center transition-transform hover:-translate-y-2 cursor-pointer"
              style={{
                boxShadow: '16px 18px 24px rgba(200, 200, 200, 0.9)'
              }}
            >
              <h3 className="font-extrabold text-black text-[17px] sm:text-[20px] tracking-wide text-center px-4">
                {title}
              </h3>
            </Link>
          ))}
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

      {/* Add custom CSS class to hide scrollbar for horizontal cards component */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </main>
  );
}
