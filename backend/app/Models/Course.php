<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
