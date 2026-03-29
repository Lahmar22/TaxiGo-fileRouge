<?php

namespace App\Models;
use App\Models\User;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = [
        'role_name',
        'user_id',
        
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
