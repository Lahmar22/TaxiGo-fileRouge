<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chauffeur extends Model
{
    protected $fillable = [
        'user_id',
        'status',
        'number_permis',
        'vehicule',
        'revenu_total',
    ];
}
