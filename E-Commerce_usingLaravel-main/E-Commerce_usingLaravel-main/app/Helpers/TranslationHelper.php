<?php

use Stichoza\GoogleTranslate\GoogleTranslate;

function translate($text, $targetLanguage, $sourceLanguage = 'auto')
{
    $translator = new GoogleTranslate($targetLanguage);
    return $translator->translate($text, $sourceLanguage);
}
