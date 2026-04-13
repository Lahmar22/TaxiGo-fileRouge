<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateCourseRequest extends FormRequest
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
            
            'pickup_location' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'distance' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'status' => 'required|string|in:en attente,confirmée,terminée',
            'date_course' => 'date',
            'client_id' => 'required|exists:clients,id',
            'chauffeur_id' => 'nullable|exists:chauffeurs,id',
        
        ];
    }
}
