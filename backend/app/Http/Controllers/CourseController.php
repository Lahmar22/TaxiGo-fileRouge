<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CreateCourseRequest;
use App\Http\Requests\accepteOffreRequest;
use App\Models\Course;
use App\Models\Chauffeur;
use App\Models\Notification;
use App\Events\BookingAcceptedEvent;
use App\Events\BookingCancelledEvent;
use App\Events\BookingTerminerEvent;
use App\Events\ChauffeurArriveEvent;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with(['client.user', 'chauffeur.user'])->get();
        return response()->json([
            'courses' => $courses
        ]);
        
    }

    public function show($id)
    {
        $courses = Course::with(['client.user', 'chauffeur.user'])
        ->where('client_id', $id)
        ->paginate(6);
        
        return response()->json([
            'courses' => $courses
        ]);
    }

    public function showByChauffeur($id)
    {
        $courses = Course::with(['client.user', 'chauffeur.user', 'evaluation'])
        ->where('chauffeur_id', $id)
        ->paginate(6);
        
        return response()->json([
            'courses' => $courses
        ]);
    }

    public function revenuChauffeur($id)
    {
        $revenu = Course::with(['client.user', 'chauffeur.user'])
        ->where('chauffeur_id', $id)
        ->paginate(6);
        
        return response()->json([
            'revenu' => $revenu
        ]);
    }

    public function availableOffers()
    {
        $courses = Course::with('client.user')
            ->whereNull('chauffeur_id')
            ->where('status', '!=', 'annuler')
            ->where('status', '!=', 'terminee')
            ->get();
        
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


        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course
        ], 201);
    }

    public function accepteOffre(accepteOffreRequest $request, $id){

        $course = Course::findOrFail($id);
        if ($course->status === 'confirmee') {
            return response()->json([
                'message' => 'Course déjà acceptée'
            ], 400);
        }

        $course->status = $request->status;
        $course->chauffeur_id = $request->chauffeur_id;
        $course->save();

        $chauffeur = Chauffeur::findOrFail($request->chauffeur_id);
        $chauffeur->revenu_total = $course->prix_course;
        $chauffeur->save();

        $course->load('chauffeur.user'); 

        broadcast(new BookingAcceptedEvent($course, $request->chauffeur_id))->toOthers();

        return response()->json([
            'message' => 'offre accepte bien',
            'course' => $course
        ]);

    }

    public function annulerOffre($id){

        $course = Course::findOrFail($id);
        $course->status = "annuler";
        $course->save();

        broadcast(new BookingCancelledEvent($course, $course->chauffeur_id))->toOthers();

        return response()->json([
            'message' => 'offre annuler bien',
        ]);

    }

    public function terminerCourse($id){

        $course = Course::findOrFail($id);
        $course->status = "terminee";
        $course->save();

        broadcast(new BookingTerminerEvent($course, $course->chauffeur_id))->toOthers();

        return response()->json([
            'message' => 'offre terminee bien',
        ]);

    }

    public function rateCourse(Request $request, $id){

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:500',
            'chauffeur_id' => 'required|exists:chauffeurs,id'
        ]);

        $course = Course::findOrFail($id);
        
        $course->rating = $request->rating;
        $course->rating_comment = $request->comment;
        $course->save();

        return response()->json([
            'message' => 'Merci pour votre évaluation!',
            'course' => $course
        ]);

    }

    public function arriveChauffeur($id){

        $course = Course::findOrFail($id);
    
        broadcast(new ChauffeurArriveEvent($course, $course->chauffeur_id))->toOthers();

        return response()->json([
            'message' => 'Chauffeur arrivé à destination',
        ]);
    }
}
