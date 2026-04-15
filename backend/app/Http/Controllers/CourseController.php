<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CreateCourseRequest;
use App\Http\Requests\accepteOffreRequest;
use App\Models\Course;
use App\Models\Notification;
use App\Events\NewBookingEvent;
use App\Events\BookingAcceptedEvent;
use App\Events\BookingCancelledEvent;

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

        
        $course = Course::create([
            'adresse_depart' => $request->pickup_location,
            'destination' => $request->destination,
            'distance' => $request->distance,
            'prix_course' => $request->price,
            'status' => $request->status,
            'date_course' => now(),
            'client_id' => $request->client_id
            
        ]); 

        broadcast(new NewBookingEvent($course))->toOthers();

        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course
        ], 201);
    }

    public function accepteOffre(accepteOffreRequest $request, $id){

        $course = Course::findOrFail($id);
        $course->status = $request->status;
        $course->chauffeur_id = $request->chauffeur_id;
        $course->save();

        broadcast(new BookingAcceptedEvent($course))->toOthers();

        return response()->json([
            'message' => 'offre accepte bien',
        ]);

    }

    public function annulerOffre($id){

        $course = Course::findOrFail($id);
        $course->status = "annuler";
        $course->save();

        broadcast(new BookingCancelledEvent($course))->toOthers();

        return response()->json([
            'message' => 'offre annuler bien',
        ]);

    }
}
