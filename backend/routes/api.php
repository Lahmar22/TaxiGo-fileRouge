<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChauffeurController;
use App\Http\Controllers\StatistiqueController;
use App\Http\Controllers\ReclamationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\EvaluationController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/courses', CourseController::class);
    Route::get('/courses/available/offers', [CourseController::class, 'availableOffers']);
    Route::patch('/course/{id}/accepte', [CourseController::class, 'accepteOffre']);
    Route::patch('/course/{course}/annuler', [CourseController::class, 'annulerOffre']);
    Route::patch('/course/{course}/terminer', [CourseController::class, 'terminerCourse']);
    Route::post('/courses/{course}/rate', [CourseController::class, 'rateCourse']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::get('/courses/chauffeur/{id}', [CourseController::class, 'showByChauffeur']);
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::patch('/users/{id}', [UserController::class, 'banned']);
    Route::get('/chauffeurs', [ChauffeurController::class, 'index']);
    Route::patch('/chauffeur/{id}', [ChauffeurController::class, 'updateStatus']);
    Route::patch('/chauffeurs/{id}', [ChauffeurController::class, 'validateChauffeur']);
    Route::get('/statistiques', [StatistiqueController::class, 'index']);
    Route::get('/statistiques/chauffeur/{id}', [StatistiqueController::class, 'statisqtiqueChauffeur']);
    Route::get('/statistiques/chauffeur/{id}/revenu', [StatistiqueController::class, 'revenuChauffeur']);
    Route::get('/reclamations', [ReclamationController::class, 'index']);
    Route::post('/reclamations', [ReclamationController::class, 'store']);
    Route::patch('/reclamations/{id}', [ReclamationController::class, 'updateStatus']);
    Route::get('/notifications/{model}/{id}', [NotificationController::class, 'show']);

    Route::get('/paiements', [PaiementController::class, 'index']);
    Route::post('/paiements', [PaiementController::class, 'store']);
    Route::post('/create-payment-intent', [PaiementController::class, 'createPaymentIntent']);
    Route::post('/confirm-payment', [PaiementController::class, 'confirmPayment']);

    Route::post('/evaluations', [EvaluationController::class, 'store']);

});
