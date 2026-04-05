"use client";
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
            Samarinda, {dateStr}
          </p>
        </div>
        
        <p className="text-center mb-8 text-sm font-black opacity-90 tracking-widest uppercase">
          Bagaimana perasaanmu hari ini?
        </p>

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
        </div>
      </div>
    </div>
  );
}