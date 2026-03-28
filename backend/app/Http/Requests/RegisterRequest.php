<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'number_phone' => 'required|string|max:20',
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:admin,chauffeur,client',
        
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'Le nom est obligatoire.',
            'last_name.required' => 'Le prenom est obligatoire.',
            'email.unique' => 'Ce email existe déjà.',
            'number_phone.required' => 'Le numero telephone est obligatoire.',
            'password.min' => 'mote de passe min 6 caractére .',
            'role.required' => 'Le role est obligatoire.',
        ];
    }
}
