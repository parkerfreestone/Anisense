<?php

use App\Http\Controllers\AnimeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::get('anime/{id}', [AnimeController::class, 'getAnimeById']);
    Route::get('anime/top/{page}/{type}/{limit}', [AnimeController::class, 'getTopAnime']);
    Route::get('genres/anime/{filter}', [AnimeController::class, 'getAnimeGenres']);
    Route::get('anime/search', [AnimeController::class, 'getAnimeSearch']);
});
