<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Client;
use App\Models\Chauffeur;
use App\Models\Paiement;

class Course extends Model
{
    protected $fillable = [
        'adresse_depart',
        'destination',
        'distance',
        'prix_course',
        'status',
        'date_course',
        'client_id',
        'chauffeur_id'
    ];

    public function client(){
        return $this->belongsTo(Client::class);
    }

    public function chauffeur(){
        return $this->belongsTo(Chauffeur::class);
    }

    public function paiement()
    {
        return $this->hasOne(Paiement::class);
    }
}
