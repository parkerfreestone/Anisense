<?php

namespace App\Console\Commands;

use App\Models\Anime;
use Illuminate\Console\Command;
use Intervention\Image\ImageManagerStatic as Image;
use Mexitek\PHPColors\Color;

class UpdateAnimeColors extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'anime:update-average-colors';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update the average color of all anime records based on their average pixel color';

    /**
     * Execute the console command.
     */
    public function handle()
{
    $animes = Anime::all();

    foreach ($animes as $anime) {
        //read the image
        $img = Image::make($anime->image_url);
        $w = $img->width();
        $h = $img->height();

        $rTotal = 0;
        $gTotal = 0;
        $bTotal = 0;
        $total = 0;

        //iterate over the pixels
        for ($y = 0; $y < $h; $y++) {
            for ($x = 0; $x < $w; $x++) {
                $pixel = $img->pickColor($x, $y, 'array');
                
                $rTotal += $pixel[0];
                $gTotal += $pixel[1];
                $bTotal += $pixel[2];
                $total++;
            }
        }

        $rAvg = round($rTotal / $total);
        $gAvg = round($gTotal / $total);
        $bAvg = round($bTotal / $total);

        $hexColor = sprintf("#%02x%02x%02x", $rAvg, $gAvg, $bAvg);
        $color = new Color($hexColor);


        $anime->update([
            'average_color' => $color,
        ]);
    }

    $this->info('Anime colors updated successfully.');
}

}
