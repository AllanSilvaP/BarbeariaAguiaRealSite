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
    Route::post('/agendamentos', [AgendamentoController::class, 'store']);

    //admin
    Route::middleware(['admin'])->prefix('admin')->group(function () {
        Route::apiResource('usuarios', UsuarioController::class);
        Route::apiResource('servicos', ServicoController::class);
        Route::apiResource('agendamentos', AgendamentoController::class);
        Route::apiResource('pagamentos', PagamentoController::class);
        //getBarbeiro
        Route::get('/barbeiros', [UsuarioController::class, 'listarBarbeiros']);
        //agendamentosAdmin
        Route::get('/barbeiros-agendamentos', [AgendamentoController::class, 'agendamentosPorBarbeiro']);
        Route::get('/agendamentos-concluidos', [AgendamentoController::class, 'concluidos']);
        Route::get('/listar-usuarios', [UsuarioController::class, 'listarUsuarios']);
    });

    //barbeiro
    Route::middleware(['barbeiro'])->prefix('barbeiro')->group(function () {
        Route::apiResource('agendamentos', AgendamentoController::class);
        Route::apiResource('servicos', ServicoController::class);
        Route::get('/me/servicos', [ServicoController::class, 'meusServicos']);
        Route::get('/me/agendamentos', [AgendamentoController::class, 'meusAgendamentos']);
        Route::get('/me/agendamentos-concluidos', [AgendamentoController::class, 'concluidosIndividual']);
        Route::get('/me/pagamentos', [PagamentoController::class, 'meusPagamentos']);
        Route::delete('/pagamentos/{id}', [PagamentoController::class, 'destroy']);
        Route::post('/pagamentos', [PagamentoController::class, 'store']);
        Route::put('/pagamentos/{id}', [PagamentoController::class, 'update']);
        Route::get('/me/pagamentos-agrupados', [PagamentoController::class, 'meusPagamentosAgrupados']);
        Route::get('/barbeiros', [UsuarioController::class, 'listarBarbeiros']);
        Route::get('/listar-usuarios', [UsuarioController::class, 'listarUsuarios']);
    });

    //cliente
    Route::middleware(['cliente'])->prefix('cliente')->group(function () {
        Route::get('/me/agendamentos', [AgendamentoController::class, 'meusAgendamentos']);
        Route::get('/servicos', [ServicoController::class, 'index']);
        Route::get('/barbeiros', [UsuarioController::class, 'listarBarbeiros']);
        Route::post('/agendamentos', [UsuarioController::class, 'store']);
    });
});


