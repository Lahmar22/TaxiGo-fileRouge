<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Course;

class ChauffeurArriveEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Course $course, public $chauffeur_id) {}

    public function broadcastOn(): Channel
    {
        return new Channel('courses');
    }

    public function broadcastAs(): string
    {
        return 'booking-arrive';
    }

    public function broadcastWith(): array
    {
        return [
            'course' => [
                'id' => $this->course->id,
                'status' => $this->course->status,
            ]
        ];
    }
}
