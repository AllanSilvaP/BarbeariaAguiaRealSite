<?php

namespace App\Http\Controllers;

use App\Models\Pagamento;
use App\Http\Controllers\Controller;
use App\Models\Agendamento;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PagamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Pagamento::with(['cliente', 'agendamento'])->get();
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
