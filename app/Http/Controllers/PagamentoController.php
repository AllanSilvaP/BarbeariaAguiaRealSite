<?php

namespace App\Http\Controllers;

use App\Models\Pagamento;
use App\Http\Controllers\Controller;
use App\Models\Agendamento;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Carbon;

class PagamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $group = $request->boolean('group', false);
        $dataInicial = $request->query('data_inicio');
        $dataFinal = $request->query('data_fim');

        $query = Pagamento::with('cliente', 'agendamento.barbeiro');

        if ($dataInicial && $dataFinal) {
            $query->whereBetween('data_pagamento', [$dataInicial, $dataFinal]);
        } elseif ($request->has('data_pagamento')) {
            $query->whereDate('data_pagamento', $request->query('data_pagamento'));
        }

        $pagamentos = $query->get();

        if ($group) {
            $agrupado = $pagamentos->groupBy(function ($pagamento) {
                return $pagamento->agendamento->barbeiro->nome ?? 'Sem nome';
            })->map(function ($items, $barbeiro) {
                return [
                    'barbeiro' => $barbeiro,
                    'total' => $items->sum('valor'),
                    'pagamentos' => $items->map(function ($p) {
                        return [
                            'forma_pagamento' => $p->forma_pagamento,
                            'valor' => $p->valor,
                        ];
                    })->values()
                ];
            })->values();

            return response()->json($agrupado);
        }

        return response()->json($pagamentos);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_agendamento' => [
                'required',
                Rule::unique('pagamentos', 'id_agendamento')
            ],
            'valor' => 'required|numeric',
            'forma_pagamento' => 'required|in:pix,dinheiro,cartão',
        ]);

        $pagamentoExistente = Pagamento::where('id_agendamento', $request->id_agendamento)->first();

        if ($pagamentoExistente) {
            return response()->json(['message' => 'Este agendamento já foi pago.'], 422);
        }

        return Pagamento::create([
            'id_cliente' => $request->id_cliente,
            'id_agendamento' => $request->id_agendamento,
            'valor' => $request->valor,
            'forma_pagamento' => $request->forma_pagamento,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Pagamento::with('cliente')->findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pagamento $pagamento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $pagamento = Pagamento::findOrFail($id);
        $pagamento->update($request->all());
        return $pagamento;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Pagamento::destroy($id);
        return response()->json(['mensagem' => 'Pagamento excluído']);
    }

    public function meusPagamentos()
    {
        $usuario = auth('api')->user();
        return Pagamento::where('id_cliente', $usuario->id_usuario)->get();
    }
}
