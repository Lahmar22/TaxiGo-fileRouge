<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Chauffeur extends Model
{
    protected $fillable = [
        'user_id',
        'status',
        'number_permis',
        'vehicule',
        'revenu_total',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
