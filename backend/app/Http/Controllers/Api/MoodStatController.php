<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mood;
use App\Models\MoodLog;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MoodStatController extends Controller
{
    /**
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
            ->map(function ($mood) use ($rawCounts) {
                return [
                    'id_mood'    => $mood->id_mood,
                    'nama_mood'  => $mood->nama_mood,
                    'icon'       => $mood->icon,
                    'level_mood' => $mood->level_mood,
                    'count'      => (int) ($rawCounts[$mood->id_mood] ?? 0),
                ];
            });

        return response()->json([
            'data' => [
                'year'       => (int) $validated['year'],
                'month'      => (int) $validated['month'],
                'total_days' => $counts->sum('count'),
                'counts'     => $counts,
            ],
        ]);
    }
}
