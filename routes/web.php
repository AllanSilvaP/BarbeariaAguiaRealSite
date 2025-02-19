<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;

Route::get('/', function () {
    return view('index');
})->name('/');

Route::get('/areaFuncionario', function () {
    return view('areafunc');
})->name('areafunc');

Route::post('/cadastrar', [UsuarioController::class, 'cadastrarUsuario']);
