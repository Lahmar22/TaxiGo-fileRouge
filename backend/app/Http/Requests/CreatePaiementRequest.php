<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreatePaiementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->role->role_name === 'client';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'montant' => 'required|numeric',
            'mode_paiement' => 'required|string|in:carte,cash',
            'payment_method_id' => 'required_if:mode_paiement,carte|string',
            'status_paiement' => 'required|boolean',
            'course_id' => 'required|exists:courses,id',
        ];
    }
}
