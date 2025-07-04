<?php

namespace App\Http\Controllers;

use App\Models\Servico;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ServicoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Servico::all();
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

        $servico = Servico::create([
            'nome' => $request->nome,
            'descricao' => $request->descricao,
            'preco' => $request->preco,
            'duracao_minutos' => $request->duracao_minutos,
            'id_barbeiro' => $usuario->tipo_usuario === 'barbeiro' ? $usuario->id_usuario : $request->id_barbeiro,
        ]);

        return $servico;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Servico::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Servico $servico)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $servico = Servico::findOrFail($id);
        $servico->update($request->all());
        return $servico;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Servico::destroy($id);
        return response()->json(['mensagem' => 'Serviço removido']);
    }

    public function meusServicos() {
        $usuario = auth('api')->user();
        return Servico::where('id_barbeiro', $usuario->id_usuario)->get();
    }
}
