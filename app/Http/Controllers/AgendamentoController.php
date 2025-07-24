<?php

namespace App\Http\Controllers;

use App\Models\Agendamento;
use App\Http\Controllers\Controller;
use App\View\Components\Agendas;
use Illuminate\Http\Request;

class AgendamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Agendamento::with(['cliente', 'barbeiro', 'servicos'])->get();
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

        $request->validate([
            'id_barbeiro' => 'required|exists:usuarios,id_usuario',
            'servicos' => 'required|array|min:1',
            'servicos.*' => 'exists:servicos,id_servico',
            'data_hora' => 'required|date'
        ]);

        $agendamento = Agendamento::create([
            'id_cliente' => $usuario->id_usuario,
            'id_barbeiro' => $request->id_barbeiro,
            'data_hora' => $request->data_hora,
            'status' => 'pendente'
        ]);

        $agendamento->servicos()->attach($request->servicos);

        return $agendamento->load(['cliente','barbeiro','servicos']);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Agendamento::with(['cliente', 'barbeiro', 'servicos'])->findOrFail($id);
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
    try {
        Agendamento::destroy($id);
        return response()->json(['mensagem' => 'Agendamento cancelado com sucesso.']);
    } catch (\Illuminate\Database\QueryException $e) {
        if ($e->getCode() === '23000') {
            return response()->json([
                'mensagem' => 'Não é possível cancelar o agendamento, pois já possui um pagamento registrado.'
            ], 400);
        }

        return response()->json([
            'mensagem' => 'Erro ao cancelar agendamento.',
            'erro' => $e->getMessage()
        ], 500);
    }
}


    public function meusAgendamentos()
    {
        $usuario = auth('api')->user();

        if ($usuario->tipo_usuario === 'cliente') {
            return Agendamento::where('id_cliente', $usuario->id_usuario)->with('servicos')->get();
        }

        if ($usuario->tipo_usuario === 'barbeiro') {
            return Agendamento::where('id_barbeiro', $usuario->id_usuario)->with('cliente')->get();
        }

        return response()->json(['erro' => 'Perfil não autorizado'], 403);
    }


    //FUNCAO PARA LISTAR AGENDAMENTOS

    public function agendamentosPorBarbeiro(Request $request) {
    $dataFiltro = $request->query('data'); // Recebe a data da query string

    $agendamentosQuery = Agendamento::with(['barbeiro', 'cliente', 'servicos'])
        ->whereHas('barbeiro', function($query) {
            $query->where('tipo_usuario', 'barbeiro');
        });

    if ($dataFiltro) {
        $agendamentosQuery->whereDate('data_hora', $dataFiltro); // Filtra pela data (ignora hora)
    }

    $agendamentos = $agendamentosQuery->orderBy('data_hora', 'desc')->get();

    $agrupados = [];

    foreach ($agendamentos as $agendamento) {
        $barbeiroId = $agendamento->barbeiro->id_usuario ?? null;

        if (!$barbeiroId) continue;

        if (!isset($agrupados[$barbeiroId])) {
            $agrupados[$barbeiroId] = [
                'nome' => $agendamento->barbeiro->nome,
                'agendamentos' => []
            ];
        }

        $agrupados[$barbeiroId]['agendamentos'][] = [
            'id_agendamento' => $agendamento->id_agendamento,
            'cliente' => ['nome' => $agendamento->cliente->nome ?? 'N/A'],
            'servicos' => $agendamento->servicos->pluck('nome')->toArray(),
            'data_hora' => $agendamento->data_hora,
            'status' => $agendamento->status
        ];
    }

    return array_values($agrupados);
}

    public function concluidos()
    {
        $agendamento = Agendamento::with(['cliente', 'barbeiro', 'servicos'])
            ->where('status', 'concluido')
            ->whereDoesntHave('pagamento')
            ->get();

        return response()->json($agendamento);
    }

}
