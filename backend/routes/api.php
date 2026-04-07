<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChauffeurController;
use App\Http\Controllers\StatistiqueController;
use App\Http\Controllers\ReclamationController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/courses', CourseController::class);
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::patch('/users/{id}', [UserController::class, 'banned']);
    Route::get('/chauffeurs', [ChauffeurController::class, 'index']);
    Route::patch('/chauffeur/{id}', [ChauffeurController::class, 'updateStatus']);
    Route::patch('/chauffeurs/{id}', [ChauffeurController::class, 'validateChauffeur']);
    Route::get('/statistiques', [StatistiqueController::class, 'index']);
    Route::get('/reclamations', [ReclamationController::class, 'index']);
    Route::post('/reclamations', [ReclamationController::class, 'store']);
    Route::patch('/reclamations/{id}', [ReclamationController::class, 'updateStatus']);
});
