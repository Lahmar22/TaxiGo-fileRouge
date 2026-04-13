<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;


class NewBookingEvent implements ShouldBroadcast
{
    public $booking;

    public function __construct($booking)
    {
        $this->booking = $booking;
    }

    public function broadcastOn()
    {
        return new Channel('chauffeurs');
    }

    public function broadcastAs()
    {
        return 'NewBookingEvent';
    }
}