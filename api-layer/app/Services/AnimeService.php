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
    public function getTopAnime(int $page): array {
        $topAnimeKey = "topAnime.{$page}";

        return Cache::remember($topAnimeKey, 60 * 24, function () use ($page) {
            $response = Http::get(self::JIKAN_API_BASE_URL . "/top/anime/?page={$page}");

            if ($response->successful()) {
                return $response->json();
            }

            throw new \Exception('Failed to fetch top anime data from Jikan API.');
        });
    }
}