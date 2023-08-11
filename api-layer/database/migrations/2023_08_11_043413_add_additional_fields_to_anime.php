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
        Schema::table('animes', function (Blueprint $table) {
            $table->unsignedInteger('episodes')->nullable()->after('popularity');
            $table->string('duration')->nullable()->after('episodes');
            $table->string('trailer_url')->nullable()->after('duration');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('animes', function (Blueprint $table) {
            $table->dropColumn('episodes');
            $table->dropColumn('duration');
            $table->dropColumn('trailer_url');
        });
    }
};
