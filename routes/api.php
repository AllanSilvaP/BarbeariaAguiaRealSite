<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ContaController;

Route::post('cadastrar', [UsuarioController::class, 'cadastrarUsuario']);

Route::get('/buscar/contas', [ContaController::class, 'buscarConta']);

Route::post('/cadastrar/conta', [ContaController::class, 'cadastrarConta'])
?>
