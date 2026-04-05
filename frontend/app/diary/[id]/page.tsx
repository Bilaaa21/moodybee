import { IconArrowLeft, IconBook, IconCirclePlus, IconDocument } from "@/app/components/icons";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Koleksi Diaries – Moodybee",
  description: "View your diaries collection",
};

export default function DiaryCollectionPage({ params }: { params: { id: string } }) {
  const collectionNames = ['Koleksi Diaries A', 'Koleksi Diaries B', 'Koleksi Diaries C'];
  const collectionIndex = parseInt(params.id) - 1;
  const collectionTitle = collectionNames[collectionIndex] || 'Koleksi Diaries';

  return (
    <main className="min-h-screen bg-white pb-32 relative overflow-x-hidden flex flex-col">
      {/* Top Header Area */}
      <div className="relative pt-6 pb-6 flex items-center justify-center w-full min-h-[90px]">
        {/* Left Back Arrow Yellow Tab */}
        <div className="absolute top-0 left-0 bg-[#FDB813] px-8 py-5 rounded-br-[32px] sm:rounded-br-[40px] z-10">
          <Link href="/diary">
            <IconArrowLeft className="h-8 w-8 text-white stroke-[3px]" />
          </Link>
        </div>

        {/* Centered Title */}
        <h1 className="font-extrabold text-[20px] sm:text-[24px] text-black">
          {collectionTitle}
        </h1>
      </div>

      {/* List of diaries */}
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-10 mt-8 flex flex-col gap-6 flex-1">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="w-full border-[4px] border-black rounded-[24px] sm:rounded-[32px] px-6 py-6 sm:px-8 sm:py-8 flex flex-col sm:flex-row items-start justify-between bg-white text-black gap-4"
            style={{
              boxShadow: '8px 12px 18px rgba(220, 220, 220, 0.9)'
            }}
          >
            <p className="font-bold text-[14px] sm:text-[16px] leading-tight sm:max-w-[65%]">
              lorem ipsum color det sit amor widhi pacar martin jadi semua burger milik Allah dan sungai Amazon adalah sungai terbesar di dunia.
            </p>
            <span className="font-extrabold text-[14px] sm:text-[15px] whitespace-nowrap text-right pt-0.5">
              16 March 2008
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Nav Bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white pb-4 pt-4 px-10 flex items-center justify-around z-50 border-t border-gray-100">
        <Link href="/diary" className="p-2 transition-transform hover:scale-110 active:scale-95 group">
          <IconBook className="h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] text-[#7CCC29] stroke-[2px] group-hover:drop-shadow-sm" />
        </Link>
        <Link href="/dashboard" className="p-2 transition-transform hover:scale-110 active:scale-95 group">
          <IconCirclePlus className="h-[48px] w-[48px] sm:h-[58px] sm:w-[58px] text-[#7CCC29] stroke-[2.5px] group-hover:drop-shadow-sm" />
        </Link>
        <Link href="#" className="p-2 transition-transform hover:scale-110 active:scale-95 group">
          <IconDocument className="h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] text-[#7CCC29] stroke-[2px] group-hover:drop-shadow-sm" />
        </Link>
      </div>
    </main>
  );
}
