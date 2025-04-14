<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Exception;

class CategoriaController extends Controller
{

    public function carregarCategorias(Request $request)
    {
        try {
            $tipo = $request->input('tipo');
            $buscador = Categoria::where('tipo', $tipo)->get();

            return response()->json($buscador);
        } catch (Exception $e) {
            return response()->json([
                'Error' => 'erro ao buscar contas',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
