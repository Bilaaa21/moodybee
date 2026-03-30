<?php

use App\Http\Controllers\Api\MoodLogController;
use App\Http\Controllers\Api\MoodStatController;
use App\Http\Controllers\Api\QuoteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Mood Tracker Dashboard
|--------------------------------------------------------------------------
|
| CATATAN AUTH:
| Saat ini route di-group tanpa middleware auth karena auth (Sanctum) belum
| di-push oleh rekan. Setelah auth di-push dan kamu pull dari repo, ikuti
| langkah di bawah untuk mengaktifkan middleware:
|
|   1. Uncomment blok Route::middleware(['auth:sanctum']) di bawah.
|   2. Comment / hapus blok Route::prefix('mood') yang tanpa middleware.
|   3. Ubah $userId = 1 di setiap controller menjadi $request->user()->id_user
|
*/

// ─── Sementara (tanpa auth) ── untuk development/testing ─────────────────
Route::prefix('mood')->group(function () {
    // GET  /api/mood/available              → daftar semua mood (untuk emoji picker di FE)
    Route::get('available', [MoodLogController::class, 'availableMoods']);

    // POST /api/mood/entries                → simpan atau update mood hari ini
    Route::post('entries', [MoodLogController::class, 'store']);

    // GET  /api/mood/entries?year=&month=   → data calendar sebulan
    Route::get('entries', [MoodLogController::class, 'index']);

    // GET  /api/mood/stats?year=&month=     → count per mood untuk MoodCount
    Route::get('stats', [MoodStatController::class, 'monthly']);
});

// Quote tidak perlu auth (boleh public)
Route::get('quotes/today', [QuoteController::class, 'today']);


// ─── Setelah auth di-push: uncomment blok ini, hapus blok di atas ─────────
/*
Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('mood')->group(function () {
        Route::get('available', [MoodLogController::class, 'availableMoods']);
        Route::post('entries',  [MoodLogController::class, 'store']);
        Route::get('entries',   [MoodLogController::class, 'index']);
        Route::get('stats',     [MoodStatController::class, 'monthly']);
    });
});

Route::get('quotes/today', [QuoteController::class, 'today']);
*/
