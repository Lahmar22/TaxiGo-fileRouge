<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class createEvaluationRequest extends FormRequest
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
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'nullable|string',
            'course_id' => 'required|integer|exists:courses,id',
            'client_id' => 'required|integer|exists:clients,id',
            'chauffeur_id' => 'required|integer|exists:chauffeurs,id',
        ];
    }
}
