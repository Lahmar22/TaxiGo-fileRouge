<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('role')->get();
        return response()->json([
            'users' => $users
        ]);
    }

    public function banned($id)
    {
        $user = User::findOrFail($id);
        $role = $user->role->role_name;

        if ($role === 'admin') {
           $message = 'Admin users cannot be banned';
        } else {
            if ($user->banned) {
                $user->banned = false;
                $message = 'User has been unbanned';
            } else {
                $user->banned = true;
                $message = 'User has been banned';
            }
        }
        $user->save();

        return response()->json([
            'message' => $message
        ]);
    }
}
