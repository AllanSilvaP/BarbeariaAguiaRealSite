<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;

Route::post('cadastrar', [UsuarioController::class, 'cadastrarUsuario']);
?>

