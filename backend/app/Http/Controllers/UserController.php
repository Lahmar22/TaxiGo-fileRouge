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
        $user->banned = true;
        $user->save();

        return response()->json([
            'message' => 'User banned successfully',
            'user' => $user
        ]);
    }
}
