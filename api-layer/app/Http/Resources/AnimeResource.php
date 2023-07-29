<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnimeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'malId' => $this->mal_id,
            'titleEn' => $this->title_en,
            'titleJp' => $this->title_jp,
            'synopsis' => $this->synopsis,
            'imageUrl' => $this->image_url,
            'averageColor' => $this->average_color,
            'popularity' => $this->popularity,
            'year' => $this->year,
            'genres' => $this->genres->pluck('name'),
        ];
    }
}