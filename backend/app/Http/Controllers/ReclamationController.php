<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reclamation;
use App\Http\Requests\CreateReclamationRequest;

class ReclamationController extends Controller
{
    public function index()
    {
        $reclamations = Reclamation::with('client.user')->get(); 
        return response()->json([
            'reclamations' => $reclamations
        ]);
    }

    public function store(CreateReclamationRequest $request)
    {

        $reclamation = Reclamation::create([
            'client_id' => $request->client_id,
            'description' => $request->description,
            'date_reclamation' => now(),
            'status' => 'en attente',
        ]);

        $client = $reclamation->client;

        $client->notifications()->create([
            'message' => 'Votre réclamation a été créée avec succès.'
        ]);

        return response()->json([
            'message' => 'Reclamation created successfully',
            'reclamation' => $reclamation
        ], 201);
    }

    public function updateStatus($id)
    {
        $reclamation = Reclamation::findOrFail($id);
        $reclamation->status = 'résolue';
        $reclamation->save();

        return response()->json([
            'message' => 'Reclamation status updated successfully',
            'reclamation' => $reclamation
        ]);
    }
}

        