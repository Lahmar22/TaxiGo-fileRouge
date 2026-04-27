<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chauffeur;
use App\Models\Course;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class StatistiqueController extends Controller
{
    public function index(){
        $totalChauffeurs = Chauffeur::where('validate', true)->count();
        $totalCourse = Course::count();
        $totalUsers = User::count();
        $revenus = Course::where('status', 'terminee')
            ->join('paiements', 'courses.id', '=', 'paiements.course_id')
            ->where('paiements.status_paiement', true)
            ->sum('paiements.montant');

        $revenuParJour = Course::where('courses.status', 'terminee')
            ->join('paiements', 'courses.id', '=', 'paiements.course_id')
            ->where('paiements.status_paiement', true)
            ->select(
                DB::raw('DATE(paiements.created_at) as jour'),
                DB::raw('SUM(paiements.montant) as total_revenu')
            )
            ->groupBy(DB::raw('DATE(paiements.created_at)'))
            ->orderBy('jour', 'asc')
            ->get();
        
        $coursesParJour = Course::where('status', 'terminee')
            ->select(
                DB::raw('DATE(created_at) as jour'),
                DB::raw('COUNT(id) as total_courses')
            )
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('jour', 'asc')
            ->get();

        return response()->json([
            'totalChauffeurs' => $totalChauffeurs,
            'totalCourse' => $totalCourse,
            'totalUsers' => $totalUsers,
            'revenus' => $revenus,
            'revenuParJour' => $revenuParJour,
            'coursesParJour' => $coursesParJour
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

