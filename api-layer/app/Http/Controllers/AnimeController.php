<?php 

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;

use App\Services\AnimeService;

class AnimeController extends Controller {
    protected $animeService;

    public function __construct(AnimeService $animeService) {
        $this->animeService = $animeService;
    }

    public function getAnime($id) {
        $anime = $this->animeService->getAnime($id);

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
}