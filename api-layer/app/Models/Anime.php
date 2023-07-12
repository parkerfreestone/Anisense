<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anime extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'api_id',
        'user_id',
        'watch_status',
        'rating',
    ];

    /**
     * Get the users associated with a given anime
     */
    public function users() {
        return $this->belongsToMany(User::class)
            ->withPivot('status', 'rating')
            ->withTimestamps();
    }

    /**
     * Get the top anime users
     */
    public function topAnimeUsers() {
        return $this->belongsToMany(User::class, 'top_anime')
            ->withPivot('ranking')
            ->withTimestamps();
    }
}
