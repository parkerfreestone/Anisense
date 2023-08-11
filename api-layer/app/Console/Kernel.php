<?php

namespace App\Console;

use App\Jobs\UpdateAnimeJob;
use App\Jobs\UpdateGenresJob;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Update all the genres
        $schedule->job(new UpdateGenresJob)->dailyAt('12:00');

        // Update all the anime
        $schedule->job(new UpdateAnimeJob)->dailyAt('4:20');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
