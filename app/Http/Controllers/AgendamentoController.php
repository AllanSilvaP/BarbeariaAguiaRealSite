<?php

namespace App\Http\Controllers;

use App\Models\Agendamento;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AgendamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Agendamento::with(['cliente', 'barbeiro', 'servico'])->get();
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
        $usuario = auth('api')->user();

        $agendamento = Agendamento::create([
            'id_cliente' => $usuario->id_usuario,
            'id_barbeiro' => $request->id_barbeiro,
            'id_servico' => $request->id_servico,
            'data_hora' => $request->data_hora,
            'status' => 'pendente'
        ]);

        return $agendamento;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Agendamento::with(['cliente', 'barbeiro', 'servico'])->findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Agendamento $agendamento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $agendamento = Agendamento::findOrFail($id);
        $agendamento->update($request->all());
        return $agendamento;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Agendamento::destroy($id);
        return response()->json(['mensagem' => 'Agendamento cancelado']);
    }

    public function meusAgendamentos() {
        $usuario = auth('api')->user();

        if($usuario->tipo_usuario === 'cliente') {
            return Agendamento::where('id_cliente', $usuario->id_usuario)->with('servico')->get();
        }

        if($usuario->tipo_usuario === 'barbeiro') {
            return Agendamento::where('id_barbeiro', $usuario->id_usuario)->with('cliente')->get();
        }

        return response()->json(['erro' => 'Perfil não autorizado'],403);
    }
}
