<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ContaController;

Route::post('/cadastrar', [UsuarioController::class, 'cadastrarUsuario'])->name('cadastrar');

Route::post('/login', [UsuarioController::class, 'loginUsuario'])->name('loginUsuario');

Route::get('/buscar/contas', [ContaController::class, 'buscarContas'])->name('buscarContas');

Route::get('/buscar/conta/{id}', [ContaController::class, 'buscarContaPorId'])->name('buscarContaPorId');

Route::get('/buscar/conta/{data}', [ContaController::class, 'buscarContaPorData'])->name('buscarContaPorData');

Route::post('/cadastrar/conta', [ContaController::class, 'cadastrarConta'])->name('cadastrarConta');

Route::delete('/excluir/conta/{id}', [ContaController::class, 'excluirConta'])->name('excluirConta');

Route::patch('/pagar/conta/{id}', [ContaController::class, 'pagarConta'])->name('pagarConta');

Route::patch('/voltar/conta/{id}', [ContaController::class, 'voltarConta'])->name('voltarConta');

Route::put('/editar/conta/{id}', [ContaController::class, 'editarConta'])->name('editarConta')
?>
