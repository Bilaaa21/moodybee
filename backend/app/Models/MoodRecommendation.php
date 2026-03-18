<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MoodRecommendation extends Model
{
    protected $table = 'mood_recommendations';
    
    protected $fillable = ['id_mood', 'id_activity'];

    public function mood() {
        return $this->belongsTo(Mood::class, 'id_mood', 'id_mood');
    }

    public function activity() {
        return $this->belongsTo(Activity::class, 'id_activity', 'id_activity');
    }
}