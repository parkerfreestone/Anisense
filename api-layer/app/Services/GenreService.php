<?php

namespace App\Services;

use App\Jobs\UpdateGenresJob;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

use App\Models\Genre;

class GenreService
{
    const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';

    public function getAllGenres()
    {
        $genres = Genre::all();

        if (!$genres) {
            throw new \Exception('Failed to grab genres from the DB.');
        }

        return $genres;
    }

    public function updateGenreData()
    {
        UpdateGenresJob::dispatch();
    }

    public function updateGenresFromJikan()
    {
        $response = Http::get(self::JIKAN_API_BASE_URL . "/genres/anime");

        if ($response->successful()) {
            $genres = $response->json()['data'];

            foreach ($genres as $genreData) {
                Genre::updateOrCreate(
                    ['id' => $genreData['mal_id']],
                    ['name' => $genreData['name']],
                );
            }

            Cache::put('genres', $genres, 60 * 24);
        } else {
            throw new \Exception('Failed to grab anime from the Jikan API.');
        }
    }

}