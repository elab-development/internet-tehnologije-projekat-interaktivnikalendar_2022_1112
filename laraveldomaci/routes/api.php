<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DogadjajController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('resetPassword',[AuthController::class,'resetPassword']);

Route::resource('users', UserController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {

    //Rute vezane za dogadjaje
    Route::get('dogadjaji', [DogadjajController::class, 'index']);
    Route::get('dogadjaji/{id}', [DogadjajController::class, 'show']); 
    Route::post('dogadjaji', [DogadjajController::class, 'store']);
    Route::put('dogadjaji/{id}', [DogadjajController::class, 'update']); 
    Route::patch('dogadjaji/updateOpis/{id}', [DogadjajController::class, 'updateOpis']);
    Route::delete('dogadjaji/{id}', [DogadjajController::class, 'destroy']); 

    Route::post('logout', [AuthController::class, 'logout']);
    
});
