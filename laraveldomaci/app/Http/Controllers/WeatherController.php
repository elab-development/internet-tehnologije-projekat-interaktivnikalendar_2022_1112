<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;

use Illuminate\Http\Request;

class WeatherController extends Controller
{
    // Vracanje trenutne vremenske prognoze
    public function getCurrentWeather($city)
    {
        $apiKey = 'e1b89cea7c2d456d8959b36edbfa9e0b';
        $response = Http::get("https://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey");

        $weatherData = $response->json();
        return response()->json($weatherData);
    }
}
