<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Client;
use App\Models\Chauffeur;
use App\Models\Administrateur;

class AuthController extends Controller
{
    public function register(Request $request){
        $inputs = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'number_phone' => 'required|string|max:20',
            'password' => 'required|string|min:6',
        ]);


        

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'number_phone' => $request->number_phone,
            'password' => Hash::make( $request->password),
        ]);

        Client::create(['user_id' => $user->id]);

        return response()->json([
            'success' => true,
            'message' => 'Utilisateur créé avec succès',
            'user' => $user
        ], 201);

    }

    public function login(Request $request){
        $inputs = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required'
        ]);

        $user = User::where('email', $inputs['email'])->first();

        if (!$user || !Hash::check($inputs['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        

        $client = Client::where('user_id', $user->id)->exists();
        $admin = Administrateur::where('user_id', $user->id)->exists();
        $chauffeur = Chauffeur::where('user_id', $user->id)->exists();

        if($client){
            $role = 'client';
        }elseif($chauffeur){
            $role = 'chauffeur';
        }elseif($admin){
            $role = 'admin';
        }else{
            return response()->json(['message' => 'User role not found'], 404);
        }

       return response()->json([
            'success' => true,
            'user' => $user,
            'role' => $role
        ], 201); 

    }
}
