<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chauffeur;
use App\Models\Course;
use App\Models\User;

class StatistiqueController extends Controller
{
    public function index(){
        $totalChauffeurs = Chauffeur::where('validate', true)->count();
        $totalCourse = Course::count();
        $totalUsers = User::count();
        

        return response()->json([
            'totalChauffeurs' => $totalChauffeurs,
            'totalCourse' => $totalCourse,
            'totalUsers' => $totalUsers
        ]);

    }

    public function statisqtiqueChauffeur($id){
        $totalCourse = Course::where('chauffeur_id', $id)->count();
        $totalCourseConfirmer = Course::where('chauffeur_id', $id)->where('status', 'confirmee')->count();
        $totalCourseTerminer = Course::where('chauffeur_id', $id)->where('status', 'terminee')->count();


        return response()->json([
            'totalCourse' => $totalCourse,
            'totalCourseConfirmer' => $totalCourseConfirmer,
            'totalCourseTerminer' => $totalCourseTerminer,
        ]);
    }

    public function revenuChauffeur($id){

        $revenu = Course::where('chauffeur_id', $id)
            ->where('status', 'terminee')
            ->join('paiements', 'courses.id', '=', 'paiements.course_id')
            ->where('paiements.status_paiement', true)
            ->sum('paiements.montant');
        

        return response()->json([
            'revenu' => $revenu
        ]);
    }
}

