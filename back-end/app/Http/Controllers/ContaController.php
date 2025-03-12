<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contas;
use Illuminate\Validation\Rule;
use Exception;

class ContaController extends Controller
{
    //CRUD

    public function buscarContas(Request $request)
    {
        try {
            $status = $request->input('status');
            $buscador = Contas::where('status', $status)->get();

            return response()->json($buscador);
        } catch (Exception $e) {
            return response()->json([
                'Error' => 'erro ao buscar contas',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function cadastrarConta(Request $request)
    {

        try {
            $analisador = $request->validate([
                'nome' => 'required|string|max:255',
                'categoria' => ['required', Rule::in(['Aluguel', 'Energia', 'Salário Barbeiro', 'Doces', 'Comidas', 'Bebidas', 'Sinuca', 'Equipamento'])],
                'caixa' => ['required', Rule::in(['BRB Empresa', 'Dinheiro', 'BRB Pessoal'])],
                'data_vencimento' => 'required|date',
                'valor' => 'required|numeric|min:0',
                'forma_pagamento' => 'required|string|max:100',
                'status' => ['required', Rule::in(['A pagar', 'Pago'])],
                'data_pagamento' => 'nullable|date',
                'num_parcela' => 'required|integer|min:1',
                'total_parcelas' => 'required|integer|min:1',
            ]);

            $analisador['id_parcelamento'] = null;
            $analisador['criado_em'] = now();

            Contas::create($analisador);

            return response()->json(['message' => 'Conta cadastrada com sucesso'], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao cadastrar conta',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function excluirConta($id)
    {
        try {
            $conta = Contas::findOrFail($id);
            $conta->delete();
            return response('Conta excluida com sucesso', 200);
        } catch (Exception $e) {
            return response('Erro ao excluir conta', 500);
        }
    }

    public function pagarConta($id)
    {
        try {
            $conta = Contas::findOrFail($id);

            if ($conta->status === 'A Pagar') {
                $conta->status = 'Pago';
                $conta->save();
                return response();
            } else {
                return response()->json(['message' => 'A conta não está em status "A Pagar".'], 400);
            }
        } catch (Exception $e) {
            return response();
        }
    }

    public function editarConta(Request $request, $id)
    {
        try {
            $conta = Contas::findOrFail($id);
            $conta->update($request->only([
                'nome',
                'categoria',
                'caixa',
                'data_vencimento',
                'valor',
                'forma_pagamento',
                'status',
                'data_pagamento',
                'num_parcela',
                'total_parcela',
                'id_parcelamento',
                'criado_em'
            ]));

            return response();
        } catch (Exception $e) {
            return response();
        }
    }
}
