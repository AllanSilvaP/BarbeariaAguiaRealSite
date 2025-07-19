<?php

use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ServicoController;
use App\Http\Controllers\AgendamentoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PagamentoController;
use App\Models\Pagamento;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

//ROTAS PROTEGIDAS

Route::middleware(['auth:api'])->group(function() {

    //LOGIN E PERFIL
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    //admin
    Route::middleware(['admin'])->group(function () {
        Route::apiResource('usuarios', UsuarioController::class);
        Route::apiResource('servicos', ServicoController::class);
        Route::apiResource('agendamentos', AgendamentoController::class);
        Route::apiResource('pagamentos', PagamentoController::class);
        //getBarbeiro
        Route::get('/barbeiros', [UsuarioController::class, 'listarBarbeiros']);
        //agendamentosAdmin
        Route::get('/barbeiros-agendamentos', [AgendamentoController::class, 'agendamentosPorBarbeiro']);
    });

    //barbeiro
    Route::middleware(['barbeiro'])->group(function () {
        Route::get('/me/servicos', [ServicoController::class, 'meusServicos']);
        Route::get('/me/agendamentos', [AgendamentoController::class, 'meusAgendamentos']);
        Route::get('/me/pagamentos', [PagamentoController::class, 'meusPagamentos']);
    });

    //cliente
    Route::middleware(['cliente'])->group(function () {
        Route::get('/me/agendamentos', [AgendamentoController::class, 'meusAgendamentos']);
        Route::post('/agendamentos', [AgendamentoController::class, 'store']);
    });
});


