<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
    Schema::create('mood_activities', function (Blueprint $table) {
        $table->id();
        $table->foreignId('id_log')->constrained('mood_logs', 'id_log')->onDelete('cascade');
        $table->foreignId('id_activity')->constrained('activities', 'id_activity')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mood_activities');
    }
};
