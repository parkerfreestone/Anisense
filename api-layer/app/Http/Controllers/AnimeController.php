<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\AnimeService;

class AnimeController extends Controller {
    protected $animeService;

    public function __construct(AnimeService $animeService) {
        $this->animeService = $animeService;
    }

    public function getAnime(Request $request) {
        $page = $request->get('page', 1);
        $limit = $request->get('limit', 25);
        $sortField = $request->get('sortField', 'id');
        $sortOrder = $request->get('sortOrder', 'asc');
        $title = $request->get('title', '');
        $genres = $request->get('genres', []);

        $anime = $this->animeService->getAnimeBy($page, $limit, $title, $genres, $sortField, $sortOrder);

        return response()->json($anime);
    }

    public function updateAnimeData() {
        $this->animeService->updateAnimeData();
    }

}