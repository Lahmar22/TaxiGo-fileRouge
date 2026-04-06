<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chauffeur;

class ChauffeurController extends Controller
{
    public function index()
    {
        $chauffeurs = Chauffeur::with('user', 'vehicule')->get();
        return response()->json([
            'chauffeurs' => $chauffeurs
        ]);
    }

    public function validateChauffeur($id)
    {
        $chauffeur = Chauffeur::findOrFail($id);
        $chauffeur->validate = true;
        $chauffeur->save();

        return response()->json([
            'message' => 'Chauffeur validé avec succès',
            'chauffeur' => $chauffeur
        ]);
    }

    public function updateStatus($id)
    {
        $chauffeur = Chauffeur::findOrFail($id);
       if ($chauffeur->status) {
            $chauffeur->status = false;
        } else {
            $chauffeur->status = true;
        }
        $chauffeur->save();

        return response()->json([
            'message' => 'Statut mis à jour avec succès'
        ]);
    }
}
