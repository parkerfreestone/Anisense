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

});

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers'], function () {
    Route::apiResource('anime', AnimeController::class);
    Route::apiResource('genres', GenreController::class)->only(['index', 'update']);

    Route::get('job/update/anime', [AnimeController::class, 'update']);
    Route::get('job/update/genres', [GenreController::class, 'update']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('anime/addToProfile/{anime}', [AnimeController::class, 'addToProfile']);
        Route::patch('anime/{anime}/profile', [AnimeController::class, 'updateAnimeInProfile']);
        Route::get('user/anime', [AnimeController::class, 'getAnimeForUser']);
    });
});
