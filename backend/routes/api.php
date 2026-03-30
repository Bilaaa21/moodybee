<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- 1. AUTHENTICATION ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// --- 2. EMAIL VERIFICATION HANDLER (DIPERBAIKI) ---
// Kita gunakan Request biasa, bukan EmailVerificationRequest agar tidak butuh login
Route::get('/email/verify/{id}/{hash}', function (Request $request) {
    
    // 1. Cari user berdasarkan ID dari URL (sesuaikan dengan primary key id_user)
    $user = User::find($request->route('id'));

    // 2. Jika user tidak ada
    if (!$user) {
        return redirect('http://localhost:3000/login?error=user_not_found');
    }

    // 3. Validasi Hash keamanan (Memastikan link tidak dimanipulasi)
    if (!hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
        return redirect('http://localhost:3000/login?error=invalid_link');
    }

    // 4. Jika sudah pernah verifikasi, langsung arahkan ke login
    if ($user->hasVerifiedEmail()) {
        return redirect('http://localhost:3000/login?verified=already');
    }

    // 5. Tandai email sebagai terverifikasi di database
    if ($user->markEmailAsVerified()) {
        // Trigger event jika dibutuhkan (opsional)
        event(new \Illuminate\Auth\Events\Verified($user));
    }

    // 6. Redirect ke Next.js dengan sukses
    return redirect('http://localhost:3000/login?verified=true');
    
})->middleware(['signed'])->name('verification.verify');

// --- 3. PROTECTED ROUTES ---
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Route untuk kirim ulang email verifikasi
    Route::post('/email/verification-notification', function (Request $request) {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email sudah terverifikasi.'], 400);
        }
        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'Link verifikasi baru telah dikirim!']);
    })->name('verification.send');
});