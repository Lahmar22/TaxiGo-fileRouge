<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Course;

class Paiement extends Model
{
    protected $fillable = [
        'montant',
        'mode_paiement',
        'payment_method_id',
        'stripe_payment_intent_id',
        'status_paiement',
        'course_id',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
