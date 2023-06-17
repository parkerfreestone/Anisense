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

    public function getTopAnime($page) {
        $anime = $this->animeService->getTopAnime($page);

        Log::info('Jikan response:', ['response' => $anime]);

        return response()->json($anime);
    }
}