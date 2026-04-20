<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Reclamation;
use App\Models\Notification;
use App\Models\Course;
use App\Models\Evaluation;

class Client extends Model
{
    protected $fillable = [
        'user_id',
        
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reclamations()
    {
        return $this->hasMany(Reclamation::class);
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
