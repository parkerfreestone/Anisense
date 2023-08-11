<?php

namespace App\Jobs;

use App\Services\AnimeService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Artisan;

class UpdateAnimeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 2000;

    /**
     * Execute the job.
     */
    public function handle(AnimeService $animeService): void
    {
        try {
            Artisan::call('down');

            $animeService->updateAnimeFromJikan();

        } catch (\Exception $e) {
            throw $e;
        } finally {
            Artisan::call('up');
        }
    }
}
