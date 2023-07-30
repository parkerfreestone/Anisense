<?php

namespace App\Services;

use App\Models\Anime;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserService
{

    public function getAnimeForUserProfile(): Collection
    {
        $user = Auth::user();

        return $user->anime;
    }

    public function addAnimeToUserProfile(Anime $anime, float|null $rating, string $status): User|null
    {
        $user = Auth::user();

        try {
            $user->anime()->attach($anime->id, ['status' => $status, 'rating' => $rating]);
        
        } catch (QueryException $e) {
            $errorCode = $e->getCode();

            Log::error('Database QueryException Error: ', $e->errorInfo);

            if ($errorCode == '23505') {
                throw new \Exception('That Anime already exists in your profile!');
            }

            throw $e;
        }

        return $user;
    }

    public function updateAnimeInUserProfile(Anime $anime, float|null $rating, string $status): User|null {
        $user = Auth::user();

        try {
            $user->anime()->updateExistingPivot($anime->id, ['status' => $status, 'rating' => $rating]);
        } catch (QueryException $e) {
            throw $e;
        }

        return $user;
    }
    
}