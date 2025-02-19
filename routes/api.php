<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;

Route::post('areaFuncionario/cadastrar', [UsuarioController::class, 'cadastrarUsuario']);
?>

