<?php

use Illuminate\Support\Facades\Broadcast;
Broadcast::channel('courses', function ($user) {
  return true;
});