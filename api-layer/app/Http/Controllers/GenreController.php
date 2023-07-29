<?php

namespace App\Http\Controllers;

use App\Services\GenreService;

class GenreController extends Controller
{
    protected $genreService;

    public function __construct(GenreService $genreService)
    {
        $this->genreService = $genreService;
    }

    public function index()
    {
        return response()->json($this->genreService->getAllGenres());
    }

    public function update()
    {
        $this->genreService->updateGenreData();
    }
}