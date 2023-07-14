<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anime extends Model
{
    use HasFactory;

    protected $fillable = [
        'mal_id',
        'title',
        'synopsis',
        'image_url',
        'average_color',
        'popularity',
        'year'
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

    /**
     * Get the genres given an anime object
     */
    public function genres() {
        return $this->belongsToMany(Genre::class);
    }
}
