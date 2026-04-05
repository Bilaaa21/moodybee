<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mood;
use App\Models\MoodLog;
<<<<<<< HEAD
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
=======
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

>>>>>>> upstream/FE-bryan

class MoodStatController extends Controller
{
    /**
<<<<<<< HEAD
     * GET /api/mood/stats?year=2026&month=3
     *
     * Mengembalikan jumlah log per mood dalam 1 bulan.
     * Dipakai oleh MoodCount component di frontend.
     *
     * Response shape:
     * {
     *   "data": {
     *     "year": 2026,
     *     "month": 3,
     *     "total_days": 5,
     *     "counts": [
     *       { "id_mood": 1, "nama_mood": "Sangat Buruk", "icon": "awful.png", "level_mood": 1, "count": 0 },
     *       { "id_mood": 2, "nama_mood": "Buruk",        "icon": "bad.png",   "level_mood": 2, "count": 1 },
     *       { "id_mood": 3, "nama_mood": "Biasa",        "icon": "meh.png",   "level_mood": 3, "count": 2 },
     *       { "id_mood": 4, "nama_mood": "Senang",       "icon": "good.png",  "level_mood": 4, "count": 1 },
     *       { "id_mood": 5, "nama_mood": "Sangat Senang","icon": "rad.png",   "level_mood": 5, "count": 1 }
     *     ]
     *   }
     * }
     *
     * Catatan: semua mood selalu muncul meski count-nya 0,
     * supaya frontend tidak perlu cek keberadaan data.
     */
    public function monthly(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'year'  => ['required', 'integer', 'min:2000', 'max:2100'],
            'month' => ['required', 'integer', 'min:1', 'max:12'],
        ]);

        // TODO (setelah auth di-push): $userId = $request->user()->id_user;
        $userId = 1; // $request->user()->id_user;

        // Ambil count per id_mood untuk bulan ini
        $rawCounts = MoodLog::forMonth($userId, $validated['year'], $validated['month'])
            ->selectRaw('id_mood, COUNT(*) as count')
            ->groupBy('id_mood')
            ->pluck('count', 'id_mood'); // [id_mood => count]

        // Ambil semua mood, lalu merge dengan count (default 0 kalau tidak ada log)
        $counts = Mood::orderBy('level_mood')
            ->get(['id_mood', 'nama_mood', 'icon', 'level_mood'])
=======
     * Mengembalikan jumlah mood per kategori dalam 1 bulan.
     */
    public function monthly(Request $request)
    {
        $validated = $request->validate([
            'year'  => ['required', 'integer'],
            'month' => ['required', 'integer'],
        ]);

        $userId = $request->user()->id_user ?? $request->user()->id;

        // Ambil data count dari database
        $rawCounts = MoodLog::where('id_user', $userId)
            ->whereYear('tanggal', $validated['year'])
            ->whereMonth('tanggal', $validated['month'])
            ->select('id_mood', DB::raw('count(*) as count'))
            ->groupBy('id_mood')
            ->pluck('count', 'id_mood');

        // Mapping agar semua mood (1-5) muncul meskipun jumlahnya 0
        $counts = Mood::orderBy('level_mood', 'asc')
            ->get(['id_mood', 'nama_mood', 'level_mood'])
>>>>>>> upstream/FE-bryan
            ->map(function ($mood) use ($rawCounts) {
                return [
                    'id_mood'    => $mood->id_mood,
                    'nama_mood'  => $mood->nama_mood,
<<<<<<< HEAD
                    'icon'       => $mood->icon,
=======
>>>>>>> upstream/FE-bryan
                    'level_mood' => $mood->level_mood,
                    'count'      => (int) ($rawCounts[$mood->id_mood] ?? 0),
                ];
            });

        return response()->json([
            'data' => [
<<<<<<< HEAD
                'year'       => (int) $validated['year'],
                'month'      => (int) $validated['month'],
                'total_days' => $counts->sum('count'),
                'counts'     => $counts,
            ],
        ]);
    }
}
=======
                'year'   => (int)$validated['year'],
                'month'  => (int)$validated['month'],
                'counts' => $counts
            ]
        ]);
    }

    /**
     * Mengembalikan list mood harian untuk kalender.
     */
    public function history(Request $request)
    {
        $userId = $request->user()->id_user ?? $request->user()->id;
        
        // Ambil input atau default ke bulan/tahun sekarang jika kosong
        $month = $request->query('month', date('m'));
        $year = $request->query('year', date('Y'));

        $logs = MoodLog::where('id_user', $userId)
            ->whereYear('tanggal', $year)
            ->whereMonth('tanggal', $month)
            ->with(['mood' => function($query) {
                $query->select('id_mood', 'icon', 'nama_mood');
            }])
            ->get(['id_log', 'id_mood', 'tanggal'])
            ->map(function ($log) {
                // PENTING: Memastikan format tanggal hanya YYYY-MM-DD agar Next.js gampang cocokkinnya
                return [
                    'id_log'  => $log->id_log,
                    'id_mood' => $log->id_mood,
                    'tanggal' => date('Y-m-d', strtotime($log->tanggal)),
                    'mood'    => $log->mood
                ];
            });

        return response()->json(['data' => $logs]);
    }
}
>>>>>>> upstream/FE-bryan
