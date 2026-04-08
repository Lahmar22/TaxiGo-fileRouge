<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function show($model, $id)
    {   
        $user = auth()->user()->$model->find($id);

        $notifications = $user->notifications()->get();

        return response()->json([
            'notifications' => $notifications
        ]);
    }
}
