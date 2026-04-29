<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Chauffeur;

class Vehicule extends Model
{
    protected $fillable = [
        'permis',
        'carte_grise',
        'chauffeur_id',
        'grima',
    ];

    public function chauffeur()
    {
        return $this->belongsTo(Chauffeur::class);
    }
}
