<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Client;
use App\Models\Chauffeur;
use App\Models\Administrateur;
use App\Models\Role;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'number_phone' => $request->number_phone,
            'password' => Hash::make( $request->password),
        ]);

        switch ($request->role) {
            case 'client':
                Client::create(['user_id' => $user->id]);
                Role::create(['role_name' => 'client', 'user_id' => $user->id]);
                break;
            case 'chauffeur':
                Chauffeur::create(['user_id' => $user->id]);
                Role::create(['role_name' => 'chauffeur', 'user_id' => $user->id]);
                break;
            case 'admin':
                Administrateur::create(['user_id' => $user->id]);
                Role::create(['role_name' => 'admin', 'user_id' => $user->id]);
                break;

            default:
                
                break;
        }

        return response()->json([
            'success' => true,
            'message' => 'Utilisateur créé avec succès',
            'user' => $user
        ], 201);

    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required'
        ]);

        $credentials = $request->only('email','password');

        if (!Auth::attempt($credentials)) {

            return response()->json([
                'message' => 'Email ou mot de passe invalide'
            ],401);

        }
        
        $user = Auth::user();

        $token = $user->createToken('api-token')->plainTextToken;

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
            'role' => $role,
            'token' => $token
        ], 201); 

    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "message" => "Logged out successfully"
        ]);
    }
}
