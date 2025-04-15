<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Exception;

class CategoriaController extends Controller
{

    function listarCategorias () {
        return response()->json(Categoria::all());
    }

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

    public function addCategoria (Request $request) {
        try {
            $dados = $request->validate([
                'tipo' => 'required|string|max:100',
                'valor' => 'required|string|max:100',
            ]);

            $categoria = Categoria::create($dados);

            return response()->json($categoria);
        } catch (Exception $e) {
            return response()->json([
                'Error' => 'erro ao criar contas',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function editCategoria($id, Request $request) {
        try {
            $dados = $request->validate([
                'tipo' => 'required|string|max:100',
                'valor' => 'required|string|max:100',
            ]);

            $categoria = Categoria::findOrFail($id);
            $categoria->Categoria::update($dados);

            return response()->json($categoria);
        } catch (Exception $e) {
            return response()->json([
                'Error' => 'erro ao editar conta',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function excluirCategoria ($id) {
        try {
            $categoria = Categoria::findOrFail($id);

            $categoria->Categoria::delete();

            return response()->json($categoria);
        } catch (Exception $e) {
            return response()->json([
                'Error' => 'erro ao excluir conta',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
