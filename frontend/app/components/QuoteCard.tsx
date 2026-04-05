"use client";
<<<<<<< HEAD

// QuoteCard.tsx
// PERUBAHAN dari versi lama:
//   - Quote tidak lagi hardcode, diambil dari GET /api/quotes/today
//   - Quote berubah otomatis setiap hari, tidak berubah kalau di-refresh
//   - Tampilan / styling tidak berubah sama sekali

import { useState, useEffect } from "react";
import { fetchTodayQuote, type DailyQuote } from "@/lib/api/mood";

export default function QuoteCard() {
  const [quote, setQuote]     = useState<DailyQuote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayQuote()
      .then(setQuote)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Teks yang ditampilkan: dari API kalau sudah load, fallback saat loading
  const displayText   = loading ? "Loading..." : quote?.text   ?? "No quote today.";
  const displayAuthor = quote?.author ?? "";

  return (
    <div className="w-full rounded-[28px] border-[5px] border-black bg-white px-5 py-6 shadow-md sm:px-8 sm:py-8">
      <p className="text-center text-sm font-extrabold italic text-black leading-relaxed tracking-wide sm:text-[16px]">
        &ldquo;{displayText}&rdquo;
      </p>
      {displayAuthor && (
        <p className="mt-3 text-right text-xs font-bold text-gray-400">
          — {displayAuthor}
        </p>
=======
import { useEffect, useState } from "react";

interface QuoteData {
  text: string;
  author: string;
}

export default function QuoteCard() {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/quotes/today", {
          headers: {
            "Accept": "application/json",
          },
        });
        const json = await res.json();
        if (json.data) {
          setQuote(json.data);
        }
      } catch (err) {
        console.error("Gagal ambil quote:", err);
        // Fallback jika API error agar tidak kosong melompong
        setQuote({
          text: "If life gives you a Lemon, just make a Lemonade",
          author: "Anonymous"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="w-full rounded-[28px] border-[5px] border-black bg-white px-5 py-6 shadow-md sm:px-8 sm:py-8 min-h-[120px] flex flex-col justify-center">
      {loading ? (
        <p className="text-center text-xs font-bold animate-pulse">
          Mencari inspirasi...
        </p>
      ) : (
        <>
          <p className="text-center text-sm font-extrabold italic text-black leading-relaxed tracking-wide sm:text-[16px]">
            &ldquo;{quote?.text}&rdquo;
          </p>
          {quote?.author && (
            <p className="text-center text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-widest">
              — {quote.author}
            </p>
          )}
        </>
>>>>>>> upstream/FE-bryan
      )}
    </div>
  );
}