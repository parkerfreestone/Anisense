<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\GenreController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/trigger-genre-job', [GenreController::class, 'updateGenreData']);
Route::get('/trigger-anime-job', [AnimeController::class, 'updateAnimeData']);

require __DIR__.'/auth.php';
