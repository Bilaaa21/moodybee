<?php

<<<<<<< HEAD
use App\Http\Controllers\Api\MoodLogController;
use App\Http\Controllers\Api\MoodStatController;
use App\Http\Controllers\Api\QuoteController;
use App\Http\Controllers\Api\DatasetController;
=======
use App\Models\User;
use Illuminate\Http\Request;
>>>>>>> upstream/FE-bryan
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MoodLogController;
use App\Http\Controllers\Api\MoodStatController;
use App\Http\Controllers\Api\QuoteController;

/*
|--------------------------------------------------------------------------
<<<<<<< HEAD
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

// ini API untuk dataset
Route::get('dataset', [DatasetController::class, 'index']);
=======
| API Routes
|--------------------------------------------------------------------------
*/

// --- 1. AUTHENTICATION ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// --- 2. EMAIL VERIFICATION (DIPERBAIKI UNTUK AUTO-LOGIN) ---
Route::get('/email/verify/{id}/{hash}', function (Request $request) {
    // Cari user menggunakan find() (karena primary key sudah diset di Model)
    $user = User::find($request->route('id'));
    
    if (!$user) return redirect('http://localhost:3000/login?error=user_not_found');
    
    // Validasi Hash
    if (!hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
        return redirect('http://localhost:3000/login?error=invalid_link');
    }

    // Proses Verifikasi
    if (!$user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
        event(new \Illuminate\Auth\Events\Verified($user));
    }

    // --- LOGIKA AUTO LOGIN ---
    // Buat token baru agar Next.js tidak perlu minta login lagi
    $token = $user->createToken('auth_token')->plainTextToken;

    // Redirect langsung ke DASHBOARD (bukan login) sambil bawa token
    return redirect("http://localhost:3000/dashboard?token={$token}&verified=true");
    
})->middleware(['signed'])->name('verification.verify');

// --- 3. PROTECTED ROUTES (Hanya bisa diakses jika sudah login/punya token) ---
Route::middleware('auth:sanctum')->group(function () {
    
    // Route User Info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Route Kirim Ulang Verifikasi
    Route::post('/email/verification-notification', function (Request $request) {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email sudah terverifikasi.'], 400);
        }
        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'Link verifikasi baru telah dikirim!']);
    })->name('verification.send');

    // --- FITUR MOOD (Punya Bila) ---
    Route::prefix('mood')->group(function () {
        Route::get('available', [MoodLogController::class, 'availableMoods']);
        Route::post('entries', [MoodLogController::class, 'store']);
        Route::get('entries', [MoodLogController::class, 'index']);
        Route::get('stats', [MoodStatController::class, 'monthly']);
    });
});

Route::middleware('auth:sanctum')->get('/mood/history', [MoodStatController::class, 'history']);

// Quote Public
Route::get('quotes/today', [QuoteController::class, 'today']);
>>>>>>> upstream/FE-bryan
