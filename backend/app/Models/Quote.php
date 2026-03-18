<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $table = 'quotes';
    // Sesuaikan primary key jika kamu pakai id_quote atau id biasa
    protected $fillable = ['text', 'author'];
}