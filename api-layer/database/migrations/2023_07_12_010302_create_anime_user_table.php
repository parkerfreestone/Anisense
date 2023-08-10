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
        Schema::create('anime_user', function (Blueprint $table) {
            $table->foreignId('anime_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['watched', 'watching', 'will_watch'])->default('will_watch');
            $table->decimal('rating', 3, 1)->nullable();
            $table->unsignedInteger('rank')->nullable();
            $table->primary(['user_id', 'anime_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anime_user');
    }
};
