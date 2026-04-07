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
}
