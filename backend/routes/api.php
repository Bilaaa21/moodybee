<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MoodLogController;
use App\Http\Controllers\Api\MoodStatController;
use App\Http\Controllers\Api\QuoteController;
use App\Http\Controllers\Api\JournalCollectionController;
use App\Http\Controllers\Api\JournalController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- 1. AUTHENTICATION ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// --- 2. EMAIL VERIFICATION ---
Route::get('/email/verify/{id}/{hash}', function (Request $request) {
    $user = User::find($request->route('id'));

    if (!$user) return redirect('http://localhost:3000/login?error=user_not_found');

    if (!hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
        return redirect('http://localhost:3000/login?error=invalid_link');
    }

    if (!$user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
        event(new \Illuminate\Auth\Events\Verified($user));
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return redirect("http://localhost:3000/dashboard?token={$token}&verified=true");

})->middleware(['signed'])->name('verification.verify');

// --- 3. PUBLIC ---
Route::get('quotes/today', [QuoteController::class, 'today']);

// --- 4. PROTECTED ---
Route::middleware('auth:sanctum')->group(function () {

    // User info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Kirim ulang verifikasi
    Route::post('/email/verification-notification', function (Request $request) {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email sudah terverifikasi.'], 400);
        }
        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'Link verifikasi baru telah dikirim!']);
    })->name('verification.send');

    // Mood punya bila
    Route::prefix('mood')->group(function () {
        Route::get('available', [MoodLogController::class, 'availableMoods']);
        Route::post('entries',  [MoodLogController::class, 'store']);
        Route::get('entries',   [MoodLogController::class, 'index']);
        Route::get('stats',     [MoodStatController::class, 'monthly']);
    });

    // Mood history
    Route::get('/mood/history', [MoodStatController::class, 'history']);

    // Journal fitur bila
    Route::prefix('journal')->group(function () {
        Route::get('collections',               [JournalCollectionController::class, 'index']);
        Route::post('collections',              [JournalCollectionController::class, 'store']);
        Route::delete('collections/{id}',       [JournalCollectionController::class, 'destroy']);
        Route::get('collections/{id}/journals', [JournalController::class, 'index']);
        Route::get('journals/{id}',             [JournalController::class, 'show']);
        Route::post('journals',                 [JournalController::class, 'store']);
        Route::put('journals/{id}',             [JournalController::class, 'update']);
        Route::delete('journals/{id}',          [JournalController::class, 'destroy']);
    });
});
