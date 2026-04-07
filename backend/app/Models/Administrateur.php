<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Notification;

class Administrateur extends Model
{
    protected $fillable = [
        'user_id',

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

     public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }
}
