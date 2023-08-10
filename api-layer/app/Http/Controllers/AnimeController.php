<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddAnimeToProfileRequest;
use App\Http\Resources\AnimeCollection;
use App\Http\Resources\AnimeResource;
use App\Models\Anime;
use App\Services\UserService;
use Illuminate\Http\Request;

use App\Services\AnimeService;

class AnimeController extends Controller
{
    protected $animeService;
    protected $userService;

    public function __construct(AnimeService $animeService, UserService $userService)
    {
        $this->animeService = $animeService;
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $limit = $request->get('limit', 100);
        $sortField = $request->get('sortField', 'id');
        $sortOrder = $request->get('sortOrder', 'asc');
        $title = $request->get('title', '');
        $genres = $request->get('genres', []);

        $anime = $this->animeService->getAnimeBy($page, $limit, $title, $genres, $sortField, $sortOrder);

        // I suppose we can add this in later, it's not worth it rn :(
        // return new AnimeCollection($anime);
        return response()->json($anime);
    }

    public function show(Anime $anime)
    {
        return new AnimeResource($anime);
    }

    public function update()
    {
        $this->animeService->updateAnimeData();
    }

    public function addToProfile(AddAnimeToProfileRequest $request, Anime $anime)
    {
        try {
            $this->userService->addAnimeToUserProfile($anime, $request->rating, $request->status);
            
            return response()->json(['message' => 'Anime added to profile successfully.']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 409);
        }

    }

    public function getAnimeForUser()
    {
        $anime = $this->userService->getAnimeForUserProfile();
        // return AnimeResource::collection($anime);
        return response()->json($anime);
    }

    public function updateAnimeInProfile(Request $request, Anime $anime) {
        try {
            $this->userService->updateAnimeInUserProfile($anime, $request->rating, $request->status);
            
            return response()->json(['message' => 'Anime was successfully updated.']); 
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

}