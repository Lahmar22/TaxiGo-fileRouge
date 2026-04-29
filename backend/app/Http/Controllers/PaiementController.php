<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paiement;
use App\Http\Requests\CreatePaiementRequest;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Events\NewBookingEvent;
use App\Models\Course;
use App\Models\Chauffeur;

class PaiementController extends Controller
{
    public function index()
    {
        $paiements = Paiement::with('course')->get();
        return response()->json([
            'paiements' => $paiements
        ]);
    }

    
    public function createPaymentIntent(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'course_id' => 'required|exists:courses,id',
        ]);

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $paymentIntent = PaymentIntent::create([
            'amount' => (int)($request->amount * 100), 
            'currency' => 'mad',
            'automatic_payment_methods' => [
                'enabled' => true,
            ],
        ]);

        Paiement::create([
            'montant' => $request->amount,
            'stripe_payment_intent_id' => $paymentIntent->id,
            'status_paiement' => true,
            'course_id' => $request->course_id,
        ]);

        $course = Course::findOrFail($request->course_id);
        

        $chauffeurs = Chauffeur::where('status', true)->get();

        foreach ($chauffeurs as $chauffeur) {
            broadcast(new NewBookingEvent($course, $chauffeur->id));
        }

        return response()->json([
            'message' => 'Payment Intent créé avec succès',
        ]);
    }

}
