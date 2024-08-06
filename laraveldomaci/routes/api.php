<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DogadjajController;
use App\Http\Controllers\LokacijaController;
use App\Http\Controllers\WeatherController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Autentifikacija
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('resetPassword',[AuthController::class,'resetPassword']);

Route::resource('users', UserController::class);
Route::get('/users', [UserController::class, 'index']);

Route::get('/weather/{city}', [WeatherController::class, 'getCurrentWeather']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });

    //Rute vezane za dogadjaje - njima mogu pristupati prijavljeni korisnici samo
    Route::get('dogadjaji', [DogadjajController::class, 'index']);
    Route::get('dogadjaji/{id}', [DogadjajController::class, 'show']); 
    Route::post('dogadjaji', [DogadjajController::class, 'store']);
    Route::put('dogadjaji/{id}', [DogadjajController::class, 'update']); 
    Route::patch('dogadjaji/updateOpis/{id}', [DogadjajController::class, 'updateOpis']);
    Route::delete('dogadjaji/{id}', [DogadjajController::class, 'destroy']); 

    // lokacijama mogu pristupati samo administratori
    Route::get('/lokacije', [LokacijaController::class, 'index']);
    Route::post('lokacije', [LokacijaController::class, 'store']);
    Route::put('lokacije/{id}', [LokacijaController::class, 'update']);
    Route::delete('lokacije/{id}', [LokacijaController::class, 'destroy']);

    // Odjavljivanje
    Route::post('logout', [AuthController::class, 'logout']);
});
