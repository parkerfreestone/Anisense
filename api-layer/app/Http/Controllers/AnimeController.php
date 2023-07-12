<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\AnimeService;

class AnimeController extends Controller {
    protected $animeService;

    public function __construct(AnimeService $animeService) {
        $this->animeService = $animeService;
    }

    public function getAnimeById($id) {
        $id = intval($id);
        $anime = $this->animeService->getAnimeById($id);

        return response()->json($anime);
    }

    public function getTopAnime($page, $type, $limit) {
        $anime = $this->animeService->getTopAnime($page, $type, $limit);

        return response()->json($anime);
    }

    public function getAnimeGenres($filter) {
        $genres = $this->animeService->getAnimeGenres($filter);

        return response()->json($genres);
    }

    public function getAnimeSearch(Request $request) {
        $validatedData = $request->validate([
            'page' => 'required|integer',
            'limit' => 'required|integer',
            'type' => 'required|string',
            'score' => 'nullable|integer',
            'genres' => 'nullable|array',
            'q' => 'nullable|string',
        ]);

        $animeSearchResults = $this->animeService->getAnimeSearch(
            $validatedData['page'],
            $validatedData['limit'] ?? 10,
            $validatedData['type'] ?? 'tv',
            $validatedData['score'],
            $validatedData['genres'],
            $validatedData["q"],
        );
        

        return response()->json($animeSearchResults);
    }
}