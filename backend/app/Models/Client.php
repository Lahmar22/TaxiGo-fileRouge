<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Client extends Model
{
    protected $fillable = [
        'user_id',
        
    ];

    public function client()
    {
        return $this->belongsTo(User::class);
    }
}
