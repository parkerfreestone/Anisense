<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

use Illuminate\Support\Facades\Log;

class AnimeService {
    const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';

    /**
     * Get the information of an Anime by ID.
     *
     * @param int $animeId
     * @return array
     */
    public function getAnimeById(int $animeId): array {
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
     * @param string $filter
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

    public function getAnimeSearch(int $page = 1, ?int $limit = 10, ?string $type = null, ?int $score = null, ?array $genres = [], ?string $q = null): array {  
        $genresString = implode(',', $genres);
        $animeSearchKey = "animeSearch.{$page}.{$limit}.{$type}.{$score}.{$genresString}.{$q}";  
        
        return Cache::remember($animeSearchKey, 60 * 24, function () use ($page, $limit, $type, $score, $genresString, $q) {  
            $url = self::JIKAN_API_BASE_URL . "/anime?limit={$limit}&page={$page}";
    
            if ($type !== null) {
                $url .= "&type={$type}";
            }
    
            if ($score !== null) {
                $url .= "&score={$score}";
            }
    
            if (!empty($genres)) {
                $url .= "&genres={$genresString}";
            }
    
            // Assuming q is a query parameter you can search by
            if ($q !== null) {
                $url .= "&q={$q}";
            }
    
            Log::info("Requesting URL: $url");
    
            $response = Http::get($url);
    
            if ($response->successful()) {
                return $response->json();
            }
    
            throw new \Exception('Failed to fetch anime search data from Jikan API.');
        });
    }
}