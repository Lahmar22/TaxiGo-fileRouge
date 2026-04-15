<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
// السطر الناقص الذي يسبب الخطأ:
use Illuminate\Support\Facades\Broadcast; 

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
        // تأكد أنك تناديها بهذا الشكل
        Broadcast::routes(['middleware' => ['auth:sanctum']]);

        require base_path('routes/channels.php');
    }
}