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

    public function buscarContas (Request $request) {
        try {
            $status = $request->input('status');

            if ($status === 'A pagar') {
                $buscador = Contas::where('status', 'A pagar')->get();
            } else {
                $buscador = Contas::where('status', 'Pago')->get();
            }
            return response()->json($buscador);
        } catch (Exception $e) {
            return response()->json([
                'Error' => 'erro ao buscar contas',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function cadastrarConta (Request $request) {
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

        } catch (Exception $e) {
            return response()->json([
                'message' => 'erro em: ',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
