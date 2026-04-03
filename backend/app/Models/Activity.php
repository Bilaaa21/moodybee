<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $table = 'activities';
    protected $primaryKey = 'id_activity';

    protected $fillable = ['nama_aktivitas', 'icon'];
}
