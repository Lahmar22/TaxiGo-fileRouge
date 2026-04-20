<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Client;
use App\Models\Chauffeur;
use App\Models\Course;


class Evaluation extends Model
{
    protected $fillable = [
        'note',
        'commentaire',
        'client_id',
        'chauffeur_id',
        'course_id',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function chauffeur()
    {
        return $this->belongsTo(Chauffeur::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
