<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $isProduction = $this->app->isProduction();
        if ($isProduction) {
            URL::forceScheme('https');
        }
        // Prohibits: db:wipe, migrate:fresh, migrate:refresh, and migrate:reset
        DB::prohibitDestructiveCommands($isProduction); 
    }
}
