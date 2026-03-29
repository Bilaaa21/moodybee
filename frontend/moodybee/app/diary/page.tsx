import { IconPencil, IconBook, IconCirclePlus, IconDocument } from "@/app/components/icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diary – Daylio",
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
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 mt-12 sm:mt-16 flex-1">
        
        {/* Input Box "What's on your mind?" */}
        <div className="w-full border-[8px] border-[#7CCC29] py-8 px-6 sm:px-10 rounded-[36px] sm:rounded-[50px] shadow-sm mb-16 relative flex items-center bg-white cursor-text transition-transform hover:scale-[1.01]">
          <div className="w-full flex items-end justify-between border-b-[2px] border-[#333333] pb-1.5 px-2">
            <input
              type="text"
              placeholder="What's on your mind?"
              className="w-full text-[15px] sm:text-[17px] font-semibold text-black placeholder-[#555555] outline-none bg-transparent pt-2"
            />
            <IconPencil className="h-[22px] w-[22px] text-[#7CCC29] flex-shrink-0 mb-1 ml-4 stroke-[2.5px]" />
          </div>
        </div>

        {/* Diary Collection Cards */}
        <div className="w-full flex items-center justify-start xl:justify-center overflow-x-auto gap-10 sm:gap-14 pb-16 pt-4 px-4 -mx-4 snap-x hide-scrollbar scroll-smooth">
          {['Koleksi Diaries A', 'Koleksi Diaries B', 'Koleksi Diaries C'].map((title, idx) => (
            <div 
              key={idx}
              className="flex-shrink-0 w-[260px] h-[190px] sm:w-[320px] sm:h-[220px] bg-white rounded-[32px] sm:rounded-[44px] flex items-center justify-center snap-center transition-transform hover:-translate-y-2 cursor-pointer"
              style={{
                boxShadow: '16px 18px 24px rgba(200, 200, 200, 0.9)'
              }}
            >
              <h3 className="font-extrabold text-black text-[17px] sm:text-[20px] tracking-wide">
                {title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white pb-6 pt-6 px-10 flex items-center justify-around z-50">
        <button className="p-2 transition-transform hover:scale-110 active:scale-95 group">
          <IconBook className="h-[46px] w-[46px] sm:h-[56px] sm:w-[56px] text-[#7CCC29] stroke-[2px] group-hover:drop-shadow-sm" />
        </button>
        <button className="p-2 transition-transform hover:scale-110 active:scale-95 group">
          <IconCirclePlus className="h-[60px] w-[60px] sm:h-[72px] sm:w-[72px] text-[#7CCC29] stroke-[2.5px] group-hover:drop-shadow-sm" />
        </button>
        <button className="p-2 transition-transform hover:scale-110 active:scale-95 group">
          <IconDocument className="h-[46px] w-[46px] sm:h-[56px] sm:w-[56px] text-[#7CCC29] stroke-[2px] group-hover:drop-shadow-sm" />
        </button>
      </div>
      
      {/* Add custom CSS class to hide scrollbar for horizontal cards component */}
      <style dangerouslySetInnerHTML={{__html: `
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
