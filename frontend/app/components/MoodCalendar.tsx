"use client";
import { useState, useEffect, CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- 1. KOMPONEN ICON SVG ---
type IconProps = { className?: string; style?: CSSProperties };

const IconHappy = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M7.5 9c.5-1 2-1 2.5 0" strokeWidth="2.5" />
    <path d="M14 9c.5-1 2-1 2.5 0" strokeWidth="2.5" />
    <path d="M7.5 12 h9 c0 3.5 -2 6 -4.5 6 S7.5 15.5 7.5 12 z" fill="currentColor" stroke="none" />
  </svg>
);

const IconGood = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none" />
    <path d="M7 14c2 2 4.5 2 9 0" strokeWidth="2.5" />
  </svg>
);

const IconNeutral = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <line x1="8" y1="14" x2="16" y2="14" strokeWidth="2.5" />
    <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const IconBad = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M6 9l2.5 1.5" strokeWidth="2" />
    <path d="M18 9l-2.5 1.5" strokeWidth="2" />
    <circle cx="8.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <path d="M8 16c2-1.5 5.5-1.5 8 0" strokeWidth="2.5" />
  </svg>
);

const IconSad = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M7 11.5c.5-.5 2-.5 2.5 0" strokeWidth="2" />
    <path d="M14.5 11.5c.5-.5 2-.5 2.5 0" strokeWidth="2" />
    <path d="M8 16 c1-2 4-2 8 0" strokeWidth="2" />
    <path d="M7.5 14 c0 1-.5 2-1.5 2 c-1 0-1.5-1-1.5-2 c0-1.5 1.5-3 1.5-3 s1.5 1.5 1.5 3 z" fill="currentColor" stroke="none" />
    <path d="M19.5 14 c0 1-.5 2-1.5 2 c-1 0-1.5-1-1.5-2 c0-1.5 1.5-3 1.5-3 s1.5 1.5 1.5 3 z" fill="currentColor" stroke="none" />
  </svg>
);

// --- 2. KOMPONEN UTAMA KALENDER ---
export default function MoodCalendar() {
  const [baseDate, setBaseDate] = useState(new Date(2026, 2, 1)); // Maret 2026
  const [moodHistory, setMoodHistory] = useState<any[]>([]);

  const fetchHistory = async (year: number, month: number) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN") || localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/api/mood/history?year=${year}&month=${month}`, {
        headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
      });
      const json = await res.json();
      
      // PERBAIKAN: Laravel kadang kirim array langsung atau dibungkus { data: [] }
      return Array.isArray(json) ? json : (json.data || []);
    } catch (err) {
      console.error("Gagal fetch:", err);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const m1 = await fetchHistory(baseDate.getFullYear(), baseDate.getMonth() + 1);
      const nextMonthDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1);
      const m2 = await fetchHistory(nextMonthDate.getFullYear(), nextMonthDate.getMonth() + 1);
      setMoodHistory([...m1, ...m2]);
    };
    loadData();
    const interval = setInterval(loadData, 4000); // Sinkron tiap 4 detik
    return () => clearInterval(interval);
  }, [baseDate]);

  const handlePrev = () => setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() - 2, 1));
  const handleNext = () => setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() + 2, 1));

  const getMoodIcon = (id: any) => {
    const moodId = Number(id); // PERBAIKAN: Paksa jadi angka
    switch (moodId) {
      case 5: return <IconHappy className="w-7 h-7 text-white" />;
      case 4: return <IconGood className="w-7 h-7 text-white" />;
      case 3: return <IconNeutral className="w-7 h-7 text-white" />;
      case 2: return <IconBad className="w-7 h-7 text-white" />;
      case 1: return <IconSad className="w-7 h-7 text-white" />;
      default: return <span className="text-white text-lg font-light">+</span>;
    }
  };

  const renderMonthCard = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return (
      <div className="flex-1 bg-[#FDB813] rounded-[40px] p-6 shadow-xl border-4 border-white/20 min-w-[320px] max-w-[380px]">
        <h2 className="text-center text-2xl font-black text-white uppercase mb-6 tracking-tighter">
          {date.toLocaleString('default', { month: 'long' })} {year}
        </h2>
        
        <div className="grid grid-cols-7 gap-1 text-center font-black text-white/80 text-[10px] mb-4 uppercase">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d}>{d}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-y-4 justify-items-center">
          {days.map((day, idx) => {
            if (!day) return <div key={`empty-${idx}`} className="h-9 w-9" />;
            
            // Format YYYY-MM-DD
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            // PERBAIKAN: Cari data yang tanggalnya cocok
            const log = moodHistory.find(h => h.tanggal === dateStr);

            return (
              <div key={idx} className="flex flex-col items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/40 bg-white/20 shadow-inner overflow-hidden hover:bg-white/40 transition-all cursor-pointer">
                  {log ? getMoodIcon(log.id_mood) : <span className="text-white text-lg font-light">+</span>}
                </div>
                <span className="text-[11px] font-bold text-white mt-1">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-[800px] flex items-center justify-between mb-8 px-4">
        <button onClick={handlePrev} className="p-3 bg-white rounded-full shadow-lg text-[#FDB813] hover:scale-110 active:scale-95 transition-all">
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
        <h1 className="text-2xl font-black text-[#FDB813] tracking-tighter uppercase">Track Your Journey</h1>
        <button onClick={handleNext} className="p-3 bg-white rounded-full shadow-lg text-[#FDB813] hover:scale-110 active:scale-95 transition-all">
          <ChevronRight size={28} strokeWidth={3} />
        </button>
      </div>

      <div className="flex flex-row flex-wrap justify-center items-start gap-8 w-full max-w-[950px]">
        {renderMonthCard(baseDate)}
        {renderMonthCard(new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1))}
      </div>
    </div>
  );
}