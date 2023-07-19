<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\GenreController;
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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('anime/addToProfile/{animeId}', [AnimeController::class, 'addToProfile']);
});


Route::prefix('v1')->group(function () {
    Route::get('anime', [AnimeController::class, 'getAnime']);

    Route::get('genres', [GenreController::class, 'getGenres']);
});
