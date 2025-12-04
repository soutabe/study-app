<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class  CreateRecordRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'content' => 'required|string',
            'time' => 'required|integer',
            'date' => 'required|date'
        ];
    }

    public function messages(): array
    {
        return [
            'content.required' => '内容は必須です。',
            'time.required' => '時間は必須です。',
            'time.integer' => '時間は数値で入力してください。',
        ];
    }
}
