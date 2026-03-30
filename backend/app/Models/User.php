<?php
namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'id_user'; // Wajib karena bukan 'id'

    protected $fillable = [
        'username', 'email', 'password', 'gender', 'tanggal_lahir'
    ];

    protected $hidden = ['password'];

    public function logs() {
        return $this->hasMany(MoodLog::class, 'id_user', 'id_user');
    }
}
