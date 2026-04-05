"use client";
import { useEffect, useState } from "react";
import { IconHappy, IconGood, IconNeutral, IconBad, IconSad } from "./icons";

interface MoodStat {
  id_mood: number | string;
  count: number | string;
}

const MOOD_CONFIG: any = {
  5: { label: "Happy", color: "#FFB000", icon: IconHappy },
  4: { label: "Good", color: "#74CD28", icon: IconGood },
  3: { label: "Neutral", color: "#00BCD4", icon: IconNeutral },
  2: { label: "Bad", color: "#339AF0", icon: IconBad },
  1: { label: "Sad", color: "#3F51B5", icon: IconSad },
};

export default function MoodCount({ year, month }: { year?: number; month?: number }) {
  const [stats, setStats] = useState<MoodStat[]>([]);
  
  // Menggunakan tahun dan bulan saat ini jika tidak ada props
  const now = new Date();
  const y = year || now.getFullYear();
  const m = month || (now.getMonth() + 1);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN") || localStorage.getItem("token");
      
      const res = await fetch(`http://127.0.0.1:8000/api/mood/stats?year=${y}&month=${m}&t=${Date.now()}`, {
        headers: { 
          "Authorization": `Bearer ${token}`, 
          "Accept": "application/json" 
        }
      });
      
      const json = await res.json();
      
      // LOGIC DETEKTIF: Coba cari array counts di mana pun Laravel menaruhnya
      let countsArray = [];
      if (Array.isArray(json)) {
        countsArray = json;
      } else if (json.data && json.data.counts) {
        countsArray = json.data.counts;
      } else if (json.counts) {
        countsArray = json.counts;
      } else if (json.data && Array.isArray(json.data)) {
        countsArray = json.data;
      }

      setStats(countsArray);
    } catch (err) {
      console.error("Gagal ambil stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh tiap 3 detik agar pas klik mood di atas, angka di sini langsung naik
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, [y, m]);

  // Mapping ID 1-5 agar urut dan tidak ada yang kosong di tampilan
  const moodIds = [5, 4, 3, 2, 1]; // Urutan dari Happy ke Sad
  
  const displayData = moodIds.map((id) => {
    const statItem = stats.find((s: MoodStat) => Number(s.id_mood) === id);
    return {
      id_mood: id,
      count: statItem ? Number(statItem.count) : 0,
    };
  });

  return (
    <div className="w-full rounded-[28px] border-[5px] border-[#FDB813] bg-white shadow-md flex flex-col pt-6 pb-6">
      {/* Header Visual */}
      <div className="relative mx-auto flex h-[80px] w-[200px] items-start justify-center overflow-hidden">
        <div className="absolute top-0 h-[200px] w-[200px] rounded-full border-[16px] border-[#FDB813]" />
      </div>

      <div className="w-full px-4 sm:px-8 mt-1">
        <h3 className="text-center text-[18px] font-extrabold text-[#FDB813] mb-4 uppercase tracking-tighter">
          Mood Count
        </h3>
        <div className="w-full h-[2px] bg-gray-100 mb-6" />

        {/* Konten Statistik */}
        <div className="flex items-start justify-between gap-1">
          {displayData.map((item) => {
            const config = MOOD_CONFIG[item.id_mood];
            if (!config) return null;
            return (
              <div key={item.id_mood} className="flex flex-col items-center gap-2">
                <config.icon className="h-[32px] w-[32px] sm:h-[40px] sm:w-[40px]" style={{ color: config.color }} />
                <span className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase">
                  {config.label}
                </span>
                <span 
                  className="flex h-[20px] w-[32px] sm:h-[22px] sm:w-[38px] items-center justify-center rounded-xl text-[11px] sm:text-[12px] font-black text-white shadow-sm" 
                  style={{ background: config.color }}
                >
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}