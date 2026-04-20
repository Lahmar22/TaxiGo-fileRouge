<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class StartApp extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:start';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Démarrage du serveur Laravel...');

        // Lancer serveur Laravel
        pclose(popen('start cmd /c "php artisan serve"', 'r'));

        $this->info('Démarrage de Laravel Reverb (WebSocket)...');

        // Lancer Reverb
        pclose(popen('start cmd /c "php artisan reverb:start"', 'r'));

        $this->info('Application + Reverb démarrés avec succès ! ');
    }
}
