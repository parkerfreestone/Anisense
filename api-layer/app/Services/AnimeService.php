<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class AnimeService {
    const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';

    /**
     * Get the information of an Anime by ID.
     *
     * @param int $animeId
     * @return array
     */
    public function getAnime(int $animeId): array {
        $animeKey = "anime.{$animeId}";
        
        return Cache::remember($animeKey, 60 * 24, function () use ($animeId) {
            $response = Http::get(self::JIKAN_API_BASE_URL . "/anime/{$animeId}");

            if ($response->successful()) {
                return $response->json();
            }

            throw new \Exception('Failed to fetch anime data from Jikan API.');
        });
    }

     /**
     * Get the top anime.
     *
     * @param int $page
     * @return array
     */
    public function getTopAnime(int $page, string $type, int $limit): array {
        $topAnimeKey = "topAnime.{$page}.{$type}.{$limit}";

        return Cache::remember($topAnimeKey, 60 * 24, function () use ($page, $type, $limit) {
            $response = Http::get(self::JIKAN_API_BASE_URL . "/top/anime/?page={$page}&type={$type}&limit=${limit}");

            if ($response->successful()) {
                return $response->json();
            }

            throw new \Exception('Failed to fetch top anime data from Jikan API.');
        });
    }

    /**
     * Get all anime genres
     * 
     * @return array
     */
    public function getAnimeGenres(string $filter = "genres"): array {
        $animeGenreKey = "anime.genres";

        return Cache::remember($animeGenreKey, 60 * 24, function () use ($filter) {
            $response = Http::get(self::JIKAN_API_BASE_URL . "/genres/anime?filter={$filter}");
        
            if ($response->successful()) {
                return $response->json();
            }

            throw new \Exception('Failed to fetch anime genre data from Jikan API.');
        });
    }
}