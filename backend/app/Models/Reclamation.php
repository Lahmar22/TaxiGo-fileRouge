<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Client;

class Reclamation extends Model
{
    protected $fillable = [
        'client_id',
        'description',
        'date_reclamation',
        'status',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    
}
