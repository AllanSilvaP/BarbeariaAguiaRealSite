<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContaController;

Route::get('/', function () {
    return view('index');
})->name('/');

Route::get('/areaFuncionario', function () {
    return view('areafunc');
})->name('areafunc');

Route::get('/hub', function () {
    return view('hub');
})->name('hub');
?>
