<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evaluation;
use App\Http\Requests\createEvaluationRequest;

class EvaluationController extends Controller
{
    public function index()
    {
        $evaluations = Evaluation::all();
        return response()->json(['message' => 'Evaluation index', 'evaluations' => $evaluations]);
    }

    public function store(createEvaluationRequest $request)
    {
        $evaluation = Evaluation::create([
            'note' => $request->note,
            'commentaire' => $request->commentaire,
            'course_id' => $request->course_id,
            'client_id' => $request->client_id,
            'chauffeur_id' => $request->chauffeur_id,
        ]); 
        return response()->json(['message' => 'Evaluation created successfully', 'evaluation' => $evaluation], 201);
    }
}
