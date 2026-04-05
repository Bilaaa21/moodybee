"use client";
<<<<<<< HEAD

// MoodBanner.tsx
// PERUBAHAN dari versi lama:
//   - Tombol mood sekarang punya onClick yang POST ke API
//   - Mood yang sudah dipilih hari ini diberi highlight (scale + opacity)
//   - Tanggal sekarang dinamis dari Date, bukan hardcode
//   - Tampilan / layout tidak berubah sama sekali

import { useState, useEffect } from "react";
import { IconHappy, IconGood, IconNeutral, IconBad, IconSad } from "./icons";
import {
  fetchAvailableMoods,
  fetchMoodEntries,
  saveMoodEntry,
  type MoodOption,
} from "@/lib/api/mood";

// Mapping icon string → komponen SVG
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  happy:   IconHappy,
  good:    IconGood,
  neutral: IconNeutral,
  bad:     IconBad,
  sad:     IconSad,
};

// Label bahasa Inggris per icon (untuk tampilan di bawah emoji)
const LABEL_MAP: Record<string, string> = {
  happy:   "Happy",
  good:    "Good",
  neutral: "Neutral",
  bad:     "Bad",
  sad:     "Sad",
};

export default function MoodBanner() {
  const [availableMoods, setAvailableMoods] = useState<MoodOption[]>([]);
  const [selectedIcon, setSelectedIcon]     = useState<string | null>(null); // icon mood hari ini
  const [saving, setSaving]                 = useState(false);

  // Format tanggal dinamis, misal "30 Maret 2026"
  const today    = new Date();
  const dateStr  = today.toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });

  useEffect(() => {
    // Fetch daftar mood yang tersedia
    fetchAvailableMoods().then(setAvailableMoods).catch(console.error);

    // Cek apakah user sudah isi mood hari ini → untuk highlight tombol
    const now = new Date();
    fetchMoodEntries(now.getFullYear(), now.getMonth() + 1)
      .then((entries) => {
        const todayStr  = now.toISOString().slice(0, 10); // "YYYY-MM-DD"
        const todayEntry = entries.find((e) => e.tanggal.slice(0, 10) === todayStr);
        if (todayEntry) setSelectedIcon(todayEntry.mood.icon);
      })
      .catch(console.error);
  }, []);

  const handleSelectMood = async (mood: MoodOption) => {
    if (saving) return;

    setSelectedIcon(mood.icon); // optimistic
    setSaving(true);
    try {
      await saveMoodEntry({ id_mood: mood.id_mood });

      const today = new Date().toISOString().slice(0, 10);
      window.dispatchEvent(
        new CustomEvent("mood-saved", {
          detail: { tanggal: today, icon: mood.icon },
        })
      );
    } catch (err) {
      console.error("Gagal menyimpan mood:", err);
      setSelectedIcon(null); // rollback
    } finally {
      setSaving(false);
    }
  };

  // Urutkan dari level tertinggi → terendah (happy..sad), sesuai urutan di versi lama
  const sortedMoods = [...availableMoods].sort((a, b) => b.level_mood - a.level_mood);

  return (
    <div className="w-full bg-[#7CCC29] text-white rounded-b-[40px] shadow-md">
      <div className="mx-auto max-w-5xl px-6 pt-6 pb-8 sm:px-10 sm:pt-8 sm:pb-10">
        {/* Header text row — identik dengan versi asli */}
        <div className="flex flex-col items-center justify-between text-center gap-2 sm:flex-row sm:text-left">
          <p className="text-sm font-bold sm:text-lg">
            Welcome, Martin&apos;s girl!
          </p>
          <p className="text-xs font-bold sm:text-sm">
=======
import { useEffect, useState } from "react";
import { IconHappy, IconGood, IconNeutral, IconBad, IconSad } from "./icons";

const moods = [
  { id_mood: 5, icon: IconHappy, label: "Happy" },
  { id_mood: 4, icon: IconGood, label: "Good" },
  { id_mood: 3, icon: IconNeutral, label: "Neutral" },
  { id_mood: 2, icon: IconBad, label: "Bad" },
  { id_mood: 1, icon: IconSad, label: "Sad" },
];

export default function MoodBanner() {
  const [username, setUsername] = useState("Bregas");
  const dateStr = new Date().toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const handleMoodSelect = async (idMood: number) => {
    // 1. Ambil Token (Cek dua kemungkinan nama key)
    const token = localStorage.getItem("AUTH_TOKEN") || localStorage.getItem("token");
    
    if (!token) {
      alert("Sesi habis atau belum login. Silakan Login ulang!");
      return;
    }

    // 2. Format Tanggal Manual YYYY-MM-DD (Sangat Aman untuk Laravel)
    const d = new Date();
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const todayStr = `${year}-${month}-${day}`;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/mood/entries", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          id_mood: idMood,
          tanggal: todayStr,
          catatan: "Diinput dari Dashboard Next.js" 
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Berhasil! Refresh agar Kalender & Count terupdate
        window.location.reload(); 
      } else {
        // Jika gagal, tampilkan pesan error spesifik dari Laravel
        console.error("Detail Error Laravel:", data.errors);
        
        // Gabungkan pesan error agar terbaca semua
        const errorMessages = data.errors 
          ? Object.values(data.errors).flat().join(", ") 
          : data.message;
          
        alert("Gagal simpan: " + errorMessages);
      }
    } catch (err) {
      console.error(err);
      alert("Koneksi ke server Laravel bermasalah!");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN") || localStorage.getItem("token");
    if (!token) return;

    fetch("http://127.0.0.1:8000/api/user", {
      headers: { 
        "Authorization": `Bearer ${token}`, 
        "Accept": "application/json" 
      }
    })
    .then(res => res.json())
    .then(data => {
      // Ambil username/name, kalau tidak ada tetap Bregas
      const nameFromDB = data.username || data.name || data.data?.username || "widi";
      setUsername(nameFromDB);
    })
    .catch(() => setUsername("Bregas"));
  }, []);

  return (
    <div className="w-full bg-[#7CCC29] text-white rounded-b-[40px] shadow-md">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10">
        <div className="flex justify-between items-center mb-10">
          <div className="flex flex-col">
            <p className="text-xs opacity-80">Welcome back,</p>
            <p className="font-bold sm:text-2xl text-lg tracking-wide uppercase">{username}! 👋</p>
          </div>
          <p className="font-bold sm:text-sm text-[10px] bg-white/20 px-4 py-1 rounded-full border border-white/30 shadow-inner">
>>>>>>> upstream/FE-bryan
            Samarinda, {dateStr}
          </p>
        </div>
        
        <p className="text-center mb-8 text-sm font-black opacity-90 tracking-widest uppercase">
          Bagaimana perasaanmu hari ini?
        </p>

<<<<<<< HEAD
        {/* Mood icons row */}
        <div className="max-w-xl mx-auto mt-6 flex items-center justify-between gap-4 sm:mt-8">
          {sortedMoods.map((mood) => {
            const IconComponent = ICON_MAP[mood.icon];
            if (!IconComponent) return null;
            const isSelected = selectedIcon === mood.icon;

            return (
              <button
                key={mood.id_mood}
                onClick={() => handleSelectMood(mood)}
                disabled={saving}
                title={LABEL_MAP[mood.icon] ?? mood.nama_mood}
                className={`flex flex-col items-center gap-2 transition-transform active:scale-95 text-white
                  ${isSelected ? "scale-110 opacity-100" : "hover:scale-110 opacity-80 hover:opacity-100"}
                  ${saving ? "cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                <IconComponent className="h-12 w-12 sm:h-[60px] sm:w-[60px] stroke-[2.5px] drop-shadow-sm" />
                <span className="text-[10px] font-extrabold tracking-wide sm:text-xs">
                  {LABEL_MAP[mood.icon] ?? mood.nama_mood}
                </span>
              </button>
            );
          })}
=======
        <div className="flex justify-center gap-4 sm:gap-12">
          {moods.map((m) => (
            <button 
              key={m.id_mood} 
              onClick={() => handleMoodSelect(m.id_mood)}
              className="group flex flex-col items-center gap-3 transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <div className="bg-white/10 p-1 rounded-full group-hover:bg-white/30 transition-colors border-2 border-transparent group-hover:border-white/50 shadow-lg">
                <m.icon className="h-14 w-14 sm:h-20 sm:w-20 drop-shadow-md" />
              </div>
              <span className="text-[10px] font-black sm:text-sm tracking-wider uppercase opacity-80 group-hover:opacity-100">
                {m.label}
              </span>
            </button>
          ))}
>>>>>>> upstream/FE-bryan
        </div>
      </div>
    </div>
  );
}