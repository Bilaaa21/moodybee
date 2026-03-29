<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mood extends Model
{
    protected $table = 'moods';
    protected $primaryKey = 'id_mood';

    protected $fillable = ['nama_mood', 'icon', 'level_mood'];

    public function logs() {
        return $this->hasMany(MoodLog::class, 'id_mood', 'id_mood');
    }
}
