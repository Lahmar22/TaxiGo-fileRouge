<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CreateCourseRequest;
use App\Models\Course;
use App\Models\Notification;
use App\Events\NewBookingEvent;

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
}
