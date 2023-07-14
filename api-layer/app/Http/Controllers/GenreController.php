<?php 

namespace App\Http\Controllers;

use App\Services\GenreService;

class GenreController extends Controller {
    protected $genreService;

    public function __construct(GenreService $genreService) {
        $this->genreService = $genreService;
    }

    public function updateGenreData() {
        $this->genreService->updateGenreData();
    }

}