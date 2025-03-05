<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ContaController;

Route::post('/cadastrar', [UsuarioController::class, 'cadastrarUsuario']
)->name('cadastrar');

Route::post('/login', [UsuarioController::class, 'loginUsuario'])->name('loginUsuario');

Route::get('/buscar/contas', [ContaController::class, 'buscarContas'])->name('buscarConta');

Route::post('/cadastrar/conta', [ContaController::class, 'cadastrarConta'])->name('cadastrarConta');
?>
