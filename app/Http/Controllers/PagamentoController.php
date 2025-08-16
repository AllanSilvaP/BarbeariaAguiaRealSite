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
                    'pagamentos' => $items
                    ->groupBy(fn($p) => \Carbon\Carbon::parse($p->data_pagamento)->format('d-m-Y'))
                    ->map(function ($pagamentosDia, $data) {
                        return [
                            'data' => $data,
                            'total' => $pagamentosDia->sum('valor'),
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
            'data_pagamento' => 'sometimes|date',
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
            'data_pagamento' => $request->data_pagamento
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

        $request->validate([
            'valor' => 'sometimes|numeric',
            'forma_pagamento' => 'sometimes|in:pix,dinheiro,cartão',
            'data_pagamento' => 'sometimes|date',
        ]);

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

    public function meusPagamentos(Request $request)
    {
        $usuario = auth('api')->user();

        $query = Pagamento::with('agendamento.cliente', 'agendamento.servicos')
        ->whereHas('agendamento', function ($q) use ($usuario) {
            $q->where('id_barbeiro', $usuario->id_usuario);
        });

        if($request->filled('data_inicio') && $request->filled('data_fim')) {
            $query->whereBetween('data_pagamento', [$request->data_inicio, $request->data_fim]);
        }

        if($request->has('data_pagamento')) {
            $query->whereDate('data_pagamento', $request->query('data_pagamento'));
        }

          return response()->json($query->get());
    }

    public function meusPagamentosAgrupados (Request $request) {
        $usuario = auth('api')->user();

        $query = Pagamento::with('agendamento.cliente')
        ->whereHas('agendamento', fn($q) => $q->where('id_barbeiro', $usuario->id_usuario));

                if($request->filled('data_inicio') && $request->filled('data_fim')) {
                    $query->whereBetween('data_pagamento', [$request->data_inicio, $request->data_fim]);
                }

                $agrupado = $query->get()->groupBy('forma_pagamento')->map(function ($grupo, $forma) {
                    return [
                        'forma_pagamento' => $forma,
                        'total' => $grupo->sum('valor'),
                        'pagamentos' => $grupo->values()
                    ];
                })->values();

                return response()->json($agrupado);
    }
}
