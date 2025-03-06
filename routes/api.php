<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ContaController;

Route::post('/cadastrar', [UsuarioController::class, 'cadastrarUsuario']
)->name('cadastrar');

Route::post('/login', [UsuarioController::class, 'loginUsuario'])->name('loginUsuario');

Route::get('/buscar/contas', [ContaController::class, 'buscarContas'])->name('buscarContas');

Route::post('/cadastrar/conta', [ContaController::class, 'cadastrarConta'])->name('cadastrarConta');

Route::delete('/excluir/conta/{id}', [ContaController::class, 'excluirConta'])->name('excluirConta');

Route::patch('/pagar/conta/{id}', [ContaController::class, 'pagarConta'])->name('pagarConta');
?>
