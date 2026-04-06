<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Vehicule;

class Chauffeur extends Model
{
    protected $fillable = [
        'user_id',
        'status',
        
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicule()
    {
        return $this->hasOne(Vehicule::class);
    }
}
