"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IconCirclePlus } from "@/app/components/icons";
import { IconPencil, IconBook, IconDocument } from "@/app/components/icons";

export default function JournalPage() {
  const [isPublishing, setIsPublishing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // If the user clicks 'Save', show the Konfirmasi Papan page
  if (isPublishing) {
    return (
      <div className="min-h-screen bg-white">
        {/* My Diaries badge header */}
        <div className="flex justify-start w-full">
          <div className="bg-[#FDB813] text-white font-extrabold tracking-wide text-[22px] px-10 pt-6 pb-6 rounded-br-[36px] shadow-sm lg:px-16 lg:pt-8 lg:pb-8 lg:text-3xl lg:rounded-br-[48px]">
            My Diaries
          </div>
        </div>

        {/* Centered Konfirmasi Papan card */}
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
          <div
            className="w-full max-w-[420px] bg-white rounded-[32px] px-8 py-8"
            style={{ boxShadow: "16px 18px 36px rgba(180, 180, 180, 0.55)" }}
          >
            {/* Title */}
            <h2 className="text-[18px] font-extrabold text-black text-center mb-5">
              Konfirmasi Papan
            </h2>

            {/* Search input */}
            <div className="flex items-center gap-3 border border-black rounded-full px-4 py-2.5 mb-5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black flex-shrink-0">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder=""
                className="w-full outline-none bg-transparent text-[15px] text-black"
              />
            </div>

            {/* Diary collection list */}
            <div className="flex flex-col gap-1 mb-6">
              {["Koleksi Diaries A", "Koleksi Diaries B", "Koleksi Diaries C"].map((col) => (
                <button
                  key={col}
                  className="text-left text-[15px] font-bold text-black py-3 px-2 hover:bg-gray-50 rounded-xl transition-colors w-full"
                >
                  {col}
                </button>
              ))}
            </div>

            {/* Add new collection button */}
            <div className="flex flex-col items-center gap-3">
              <button className="w-10 h-10 rounded-full border-2 border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <button
                onClick={() => setIsPublishing(false)}
                className="flex items-center gap-1.5 text-[#6B6B6B] hover:text-black transition-colors text-[14px] font-medium mt-1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Kembali
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#7CCC29] selection:text-white">
      {/* Editor Header */}
      <header className="w-full flex items-start justify-between sticky top-0 z-10 bg-white">
        {/* Left: "Moodybee" badge, same style as "My Diaries" */}
        <Link href="/dashboard">
          <div className="bg-[#FDB813] text-white font-extrabold tracking-wide text-[22px] px-10 pt-6 pb-6 rounded-br-[36px] shadow-sm lg:px-16 lg:pt-8 lg:pb-8 lg:text-3xl lg:rounded-br-[48px] hover:brightness-105 transition-all">
            My Journal
          </div>
        </Link>

        {/* Right: Draft label + Back + Save */}
        <div className="flex items-center gap-3 px-6 sm:px-8 pt-5">
          <span className="text-[#A8A8A8] text-[13px] font-medium hidden sm:block">Draft</span>
          <Link
            href="/diary"
            className="flex items-center gap-1.5 text-[#6B6B6B] hover:text-black transition-colors text-[14px] font-medium"
            aria-label="Back to diary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </Link>
          <button
            onClick={() => setIsPublishing(true)}
            className="bg-[#7CCC29] text-white px-5 py-2 rounded-[30px] text-[14px] font-semibold shadow-sm hover:opacity-90 hover:shadow-md transition-all active:scale-95"
          >
            Save
          </button>
        </div>
      </header>


      {/* Editor Main Content */}
      <main className="w-full max-w-[740px] mx-auto px-6 sm:px-12 pt-8 sm:pt-16 pb-32">
        {/* Title Input */}
        <div className="relative group">
          <textarea
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            placeholder="Title"
            className="w-full text-4xl sm:text-[44px] leading-tight text-gray-900 font-serif placeholder-[#B3B3B1] outline-none bg-transparent mb-4 resize-none overflow-hidden"
            rows={1}
          />
        </div>

        {/* Content Area */}
        <div className="relative group flex mt-2">
          {/* Floating Action Button (The circular Plus) */}
          <div className="absolute -left-12 sm:-left-16 top-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
            <button className="p-1.5 text-black border border-black rounded-full hover:bg-black hover:text-white transition-colors" title="Add a part">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            placeholder="Tell your story..."
            className="w-full text-[19px] sm:text-[21px] text-gray-800 placeholder-[#B3B3B1] outline-none bg-transparent resize-none min-h-[400px] font-serif leading-loose"
          />
        </div>
      </main>


    </div>
  );
}
