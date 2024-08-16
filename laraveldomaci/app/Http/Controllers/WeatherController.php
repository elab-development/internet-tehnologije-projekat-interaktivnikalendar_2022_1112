<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;

use Illuminate\Http\Request;

class WeatherController extends Controller
{
    // Vracanje trenutne vremenske prognoze
    public function getCurrentWeather($city)
    {
        $apiKey = 'c21756b7f23d14ac379c0f6e200b8005';
        $response = Http::get("https://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey");

        $weatherData = $response->json();
        return response()->json($weatherData);
    }
}
