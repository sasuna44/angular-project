<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TranslationController extends Controller
{
   
    public function translate(Request $request)
    {
        $validatedData = $request->validate([
            'text' => 'required|string',
            'target_language' => 'required|string',
        ]);

        // Perform translation logic using the 'translate' helper function or any other method
        $translatedText = translate($validatedData['text'], $validatedData['target_language']);

        // Return the translated text in the response
        return response()->json(['translated_text' => $translatedText]);
    }
}
