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

    // public function store(CreatePaiementRequest $request)
    // {
    //     try {
    //         // Configure Stripe
    //         Stripe::setApiKey(env('STRIPE_SECRET'));

    //         $montantEnCentimes = intval($request->montant * 100);

    //         // If payment is by card, process through Stripe
    //         if ($request->mode_paiement === 'carte' && $request->payment_method_id) {
    //             $paymentIntent = PaymentIntent::create([
    //                 'amount' => $montantEnCentimes,
    //                 'currency' => 'eur',
    //                 'payment_method' => $request->payment_method_id,
    //                 'confirm' => true,
    //                 'automatic_payment_methods' => [
    //                     'enabled' => true,
    //                     'allow_redirects' => 'never',
    //                 ],
    //             ]);

    //             // Check if payment succeeded
    //             if ($paymentIntent->status !== 'succeeded') {
    //                 return response()->json([
    //                     'message' => 'Paiement non confirmé',
    //                     'error' => $paymentIntent->last_payment_error?->message
    //                 ], 400);
    //             }

    //             $paiement = Paiement::create([
    //                 'montant' => $request->montant,
    //                 'mode_paiement' => $request->mode_paiement,
    //                 'payment_method_id' => $request->payment_method_id,
    //                 'stripe_payment_intent_id' => $paymentIntent->id,
    //                 'status_paiement' => true,
    //                 'course_id' => $request->course_id,
    //             ]);
    //         } else {
    //             // Cash payment
    //             $paiement = Paiement::create([
    //                 'montant' => $request->montant,
    //                 'mode_paiement' => $request->mode_paiement,
    //                 'status_paiement' => $request->status_paiement,
    //                 'course_id' => $request->course_id,
    //             ]);
    //         }

    //         return response()->json([
    //             'message' => 'Paiement créé avec succès',
    //             'paiement' => $paiement
    //         ], 201);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'message' => 'Erreur lors du paiement',
    //             'error' => $e->getMessage()
    //         ], 400);
    //     }
    // }

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
            'mode_paiement' => $request->modepaiement ?? 'carte',
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
