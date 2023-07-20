<?php 

namespace App\Http\Controllers;

use App\Models\Anime;
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

    public function addToProfile(Request $request, $animeId) {
        $user = request()->user();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $anime = Anime::findOrFail($animeId);

        $rating = $request->get('rating', 0);

        $user->anime()->attach($anime->id, ['status' => 'watching', 'rating' => $rating || 0]);

        return response()->json(['message' => 'Anime added to profile successfully.']);
    }

    public function getAnimeForUser(Request $request) {
        $user = $request->user();
        $anime = $user->anime;

        return response()->json($anime);
    }

    public function updateAnimeData() {
        $this->animeService->updateAnimeData();
    }

}