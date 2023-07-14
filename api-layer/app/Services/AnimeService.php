<?php

namespace App\Services;

use App\Jobs\UpdateAnimeJob;
use App\Models\Anime;
use App\Models\Genre;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

use Illuminate\Support\Facades\Log;

class AnimeService {
    const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';

     /**
     * Our Main Anime Fetch Boy
     */
    public function getAnimeByPage(int $page = 1, int $limit = 15, string $sortField = 'id', string $sortOrder = 'asc'): array {
        $animeKey = "anime.page.{$page}.limit.{$limit}.sort.{$sortField}.{$sortOrder}";

        return Cache::remember($animeKey, 60 * 24, function () use ($page, $limit, $sortField, $sortOrder) {
            $anime = Anime::with('genres')->orderBy($sortField, $sortOrder)->paginate($limit, ["*"], 'page', $page);

            if ($anime) {
                return $anime->toArray();
            }

            throw new \Exception('Failed to fetch anime data from database.');
        });
    }

    public function updateAnimeData() {
        UpdateAnimeJob::dispatch();

        return response()->json(['message' => 'Anime data update started.']);
    }

    /**
     * This is for the update anime job
     */
    public function updateAnimeFromJikan() {
        $pageNumber = 1;
    
        do {
            $response = Http::get(self::JIKAN_API_BASE_URL . "/top/anime?page={$pageNumber}");
            
            if ($response->successful()) {
                $animePageData = $response->json();
                $animes = $animePageData['data'];
            
                foreach ($animes as $animeData) {

                    $anime = Anime::updateOrCreate(
                        ['mal_id' => $animeData['mal_id']],
                        [
                            'title' => $animeData['title'],
                            'image_url' => $animeData['images']['webp']['image_url'],
                            'synopsis' => $animeData['synopsis'],
                            'popularity' => $animeData['popularity'],
                            'year' => $animeData['aired']['prop']['from']['year'],
                        ]
                    );
    
                    if (isset($animeData['genres'])) {
                        $genreIds = [];

                        foreach ($animeData['genres'] as $genre) {

                            $dbGenre = Genre::where('name', $genre['name'])->first();
                           
                            if ($dbGenre) {
                                $genreIds[] = $dbGenre->id;
                            }
                        }
                        
                        $anime->genres()->sync($genreIds);
                    }
    
                    Cache::put("anime.{$animeData['mal_id']}", $animeData, 60 * 24);
                }
    
                $pageNumber++;
    
                usleep(500000);
            } else {
                throw new \Exception('Failed to fetch anime data from Jikan API.');
            }
        } while (!empty($animes));
    }
}