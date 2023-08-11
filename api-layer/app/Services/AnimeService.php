<?php

namespace App\Services;

use App\Jobs\UpdateAnimeJob;
use App\Models\Anime;
use App\Models\Genre;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class AnimeService
{
    const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';

    /**
     * Our Main Anime Fetch Boy
     */
    public function getAnimeBy(int $page = 1, int $limit = 100, string $title = null, array $genres = null, string $sortField = 'popularity', string $sortOrder = 'asc')
    {
        $animeKey = "anime.page.{$page}.limit.{$limit}.title_en.".($title ?? 'all').'.genres.'.($genres ? implode(',', $genres) : 'all').".sort.{$sortField}.{$sortOrder}";

        return Cache::remember($animeKey, 60 * 24, function () use ($page, $limit, $title, $genres) {
            $query = Anime::query();

            if ($title) {
                $query->where(function ($query) use ($title) {
                    $query->whereRaw('lower(trim(title_en)) like ?', '%'.strtolower(trim($title)).'%')
                        ->orWhereRaw('lower(trim(title_jp)) like ?', '%'.strtolower(trim($title)).'%');
                });
            }

            if ($genres) {
                $query->whereHas('genres', function ($q) use ($genres) {
                    $q->whereIn('name', $genres);
                });
            }

            $query->orderBy('popularity', 'asc');

            return $query->with('genres')->paginate($limit, ['*'], 'page', $page);
        });
    }

    public function updateAnimeData()
    {
        UpdateAnimeJob::dispatch()->onQueue('default');

        return response()->json(['message' => 'Anime data update started.']);
    }

    /**
     * This is for the update anime job
     */
    public function updateAnimeFromJikan()
    {
        $pageNumber = 1;

        do {
            $response = Http::get(self::JIKAN_API_BASE_URL."/anime?page={$pageNumber}");

            if ($response->successful()) {
                $animePageData = $response->json();
                $animes = $animePageData['data'];

                foreach ($animes as $animeData) {
                    Anime::upsert([
                        'mal_id' => $animeData['mal_id'],
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
                        'created_at' => now(),
                        'updated_at' => now(),
                    ], 'mal_id', [
                        'title_en',
                        'title_jp',
                        'title_default',
                        'image_url',
                        'synopsis',
                        'popularity',
                        'episodes',
                        'duration',
                        'trailer_url',
                        'year',
                        'updated_at',
                    ]);

                    if (isset($animeData['genres'])) {
                        $genreNames = array_column($animeData['genres'], 'name');
                        $genreIds = Genre::whereIn('name', $genreNames)->pluck('id')->toArray();

                        Anime::where('mal_id', $animeData['mal_id'])->each(function ($anime) use ($genreIds) {
                            $anime->genres()->sync($genreIds);
                        });
                    }
                }

                $pageNumber++;

                usleep(500000);
            } else {
                throw new \Exception('Failed to fetch anime data from Jikan API.');
            }
        } while (! empty($animes));
    }
}
