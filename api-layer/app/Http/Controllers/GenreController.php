<?php 

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Services\GenreService;

class GenreController extends Controller {
    protected $genreService;

    public function __construct(GenreService $genreService) {
        $this->genreService = $genreService;
    }

    public function getGenres() {
        $genres = Genre::all();
        
        return response()->json($genres);
    }

    public function updateGenreData() {
        $this->genreService->updateGenreData();
    }

}