<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contas;
use Illuminate\Validation\Rule;
use Exception;
use Illuminate\Support\Facades\Log;


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

    public function buscarContaPorId($id) {
        try {
            $buscador = Contas::where('id', $id)->first();

            return response()->json($buscador);
        } catch (Exception $e) {
            return response()->json([
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function buscarContaPorData($data) {
        try {
            $buscador = Contas::where('data_vencimento', $data)->get();

            return response()->json($buscador);
        } catch (Exception $e) {
            return response()->json([
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function pesquisarConta(Request $request) {
        try {
            //code...
        } catch (\Throwable $th) {
            //throw $th;
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
            return response()->json();
        } catch (Exception $e) {
            return response()->json();
        }
    }

    public function pagarConta($id)
    {
        try {
            $conta = Contas::findOrFail($id);

            if ($conta->status === 'A Pagar') {
                $conta->status = 'Pago';
                $conta->save();
                return response()->json();
            } else {
                return response()->json(['message' => 'A conta não está em status "A Pagar".'], 400);
            }
        } catch (Exception $e) {
            return response();
        }
    }

    public function voltarConta($id)
    {
        try {
            $conta = Contas::findOrFail($id);

            if ($conta->status === 'Pago') {
                $conta->status = 'A Pagar';
                $conta->save();
                return response()->json();
            } else {
                return response()->json(['message' => 'A conta não está em status "A Pagar".'], 400);
            }
        } catch (Exception $e) {
            return response();
        }
    }

    public function editarConta($id, Request $request)
{
    try {
        // Validação dos dados
        $request->validate([
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

        // Encontrando a conta
        $conta = Contas::findOrFail($id);
        // Atualizando os dados da conta
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
            'total_parcelas',
            'id_parcelamento'
        ]));

        return response()->json(['message' => 'Conta atualizada com sucesso!'], 200);
    } catch (Exception $e) {

        return response()->json(['error' => 'Erro ao atualizar a conta'], 500);
    }
}
}
