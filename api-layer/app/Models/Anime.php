<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anime extends Model
{
    use HasFactory;

    protected $fillable = [
        'mal_id',
        'title_en',
        'title_jp',
        'title_default',
        'synopsis',
        'image_url',
        'average_color',
        'popularity',
        'duration',
        'episodes',
        'trailer_url',
        'year',
    ];

    /**
     * Get the users associated with a given anime
     */
    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withPivot('status', 'rating', 'rank')
            ->withTimestamps();
    }

    /**
     * Get the genres given an anime object
     */
    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'anime_genre');
    }
}
