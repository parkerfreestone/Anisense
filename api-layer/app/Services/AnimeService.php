<?php

namespace App\Services;

use App\Jobs\UpdateAnimeJob;
use App\Models\Anime;
use App\Models\Genre;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class AnimeService {
    const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';

     /**
     * Our Main Anime Fetch Boy
     */
    public function getAnimeBy(int $page = 1, int $limit = 100, ?string $title = null, ?array $genres = null, string $sortField = 'popularity', string $sortOrder = 'asc') {
        $animeKey = "anime.page.{$page}.limit.{$limit}.title_en." . ($title ?? 'all') . ".genres." . ($genres ? implode(',', $genres) : 'all') . ".sort.{$sortField}.{$sortOrder}";

        return Cache::remember($animeKey, 60 * 24, function () use ($page, $limit, $title, $genres, $sortField, $sortOrder) {

            $anime = Anime::with('genres')
                ->when($title, function ($query) use ($title) {
                    return $query->where(function ($query) use ($title) {
                        $query->whereRaw('lower(trim(title_en)) like ?', '%' . strtolower(trim($title)) . '%')
                              ->orWhereRaw('lower(trim(title_jp)) like ?', '%' . strtolower(trim($title)) . '%');
                    });
                })
                ->when($genres, function ($query, $genres) {
                    return $query->whereHas('genres', function ($q) use ($genres) {
                        $q->whereIn('name', $genres);
                    });

                })
                ->orderBy('popularity', 'asc')
                ->paginate($limit, ["*"], 'page', $page);
                
            if ($anime) {
                return $anime;
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
            $response = Http::get(self::JIKAN_API_BASE_URL . "/anime?page={$pageNumber}");
            
            if ($response->successful()) {
                $animePageData = $response->json();
                $animes = $animePageData['data'];
            
                foreach ($animes as $animeData) {

                    $anime = Anime::updateOrCreate(
                        ['mal_id' => $animeData['mal_id']],
                            [
                                'title_en' => $animeData['title_english'],
                                'title_jp' => $animeData['title_japanese'],
                                'title_default' => $animeData['title'],
                                'image_url' => $animeData['images']['webp']['image_url'],
                                'synopsis' => $animeData['synopsis'],
                                'popularity' => $animeData['popularity'],
                                'episodes' => $animeData['episodes'],
                                'duration' => $animeData['duration'],
                                'trailer_url' => $animeData['trailer']['youtube_id'],
                                'year' => $animeData['aired']['prop']['from']['year'],
                            ]
                    );
    
                    if (isset($animeData['genres'])) {
                        $genreNames = array_column($animeData['genres'], 'name');
                        $genreIds = [];
                    
                        foreach ($genreNames as $genreName) {
                            $dbGenre = Genre::where('name', $genreName)->first();
                            
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