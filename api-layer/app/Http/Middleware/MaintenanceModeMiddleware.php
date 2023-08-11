<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class MaintenanceModeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        if (app()->isDownForMaintenance()) {
            return response()->json([
                'message' => 'Maintenance mode. Please try again later.',
            ], 503);
        }

        return $next($request);
    }
}
