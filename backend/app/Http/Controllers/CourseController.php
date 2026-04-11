<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CreateCourseRequest;
use App\Models\Course;
use App\Models\Notification;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with(['client.user', 'chauffeur.user'])->get();
        return response()->json([
            'courses' => $courses
        ]);
        
    }

    public function store(CreateCourseRequest $request)
    {
        Course::create([
            'adresse_depart' => $request->adresse_depart,
            'destination' => $request->destination,
            'distance' => $request->distance,
            'prix_course' => $request->prix_course,
            'status' => $request->status,
            'date_course' => now(),
            'client_id' => $request->client_id,
            'chauffeur_id' => $request->chauffeur_id
            
        ]);

        $client = Course::findOrFail($request->client_id)->client;

        $client->notifications()->create([
            'message' => 'Votre course de ' . $request->adresse_depart . ' à ' . $request->destination . ' a été créée avec succès.',
        ]);

        return response()->json([
            'message' => 'Course created successfully'
        ], 201);
    }
}
