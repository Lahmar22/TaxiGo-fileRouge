<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Vehicule;
use App\Models\Notification;
use App\Models\Course;
use App\Models\Evaluation;

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

    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }

    public function course()
    {
        return $this->hasMany(Course::class);
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }
}

