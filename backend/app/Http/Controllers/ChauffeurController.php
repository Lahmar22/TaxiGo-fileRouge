<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chauffeur;

class ChauffeurController extends Controller
{
    public function index()
    {
        $chauffeurs = Chauffeur::with('user')->get();
        return response()->json([
            'chauffeurs' => $chauffeurs
        ]);
    }

    public function validateChauffeur($id)
    {
        $chauffeur = Chauffeur::findOrFail($id);
        $chauffeur->status = 'valide';
        $chauffeur->save();

        return response()->json([
            'message' => 'Chauffeur validé avec succès',
            'chauffeur' => $chauffeur
        ]);
    }

    public function updateStatus($id)
    {
        $chauffeur = Chauffeur::findOrFail($id);
        $chauffeur->status = 'refusé';
        $chauffeur->save();

        return response()->json([
            'message' => 'Chauffeur refusé avec succès',
            'chauffeur' => $chauffeur
        ]);
    }
}
