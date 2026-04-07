<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('adresse_depart');
            $table->string('destination');
            $table->double('distance', 10, 2);
            $table->double('prix_course', 10, 2);
            $table->string('status')->default('en attente');
            $table->date('date_course');
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->foreignId('chauffeur_id')->constrained('chauffeurs')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
