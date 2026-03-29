<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('journals', function (Blueprint $table) {
            $table->id('id_journal');
            $table->foreignId('id_user')
                  ->constrained('users', 'id_user')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->foreignId('id_mood')
                  ->nullable()
                  ->constrained('moods', 'id_mood')
                  ->onDelete('set null')
                  ->onUpdate('cascade');
            $table->string('title', 200);
            $table->text('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journals');
    }
};
