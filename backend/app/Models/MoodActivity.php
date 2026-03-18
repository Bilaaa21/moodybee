<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MoodActivity extends Model
{
    protected $table = 'mood_activities';
    // Tabel ini biasanya tidak pakai timestamps (created_at/updated_at), 
    // kalau di migration-mu tidak ada $table->timestamps(), tambahkan ini:
    public $timestamps = false; 

    protected $fillable = ['id_log', 'id_activity'];
}