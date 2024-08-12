<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DogadjajController;
use App\Http\Controllers\IcsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [DogadjajController::class, 'indexView']);

// Ruta za eksport svih dogadjaja odjednom u .ics datoteku
Route::get('/dogadjaj/export-all', [IcsController::class, 'export'])->name('ics-export-all');

// Ruta za eksport pojedinacnih dogadjaja u .ics datoteku
Route::get('/dogadjaj/export/{id}', [IcsController::class, 'exportSingle'])->name('ics-export');

