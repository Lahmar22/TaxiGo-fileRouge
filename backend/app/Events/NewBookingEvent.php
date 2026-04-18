<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Course;

class NewBookingEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Course $course, public $chauffeur_id) {}

    public function broadcastOn(): Channel
    {
        return new Channel('chauffeur.' . $this->chauffeur_id);
    }

    public function broadcastAs(): string
    {
        return 'new-booking';
    }

    public function broadcastWith(): array
    {
        return [
            'course' => $this->course->toArray()
        ];
    }
}