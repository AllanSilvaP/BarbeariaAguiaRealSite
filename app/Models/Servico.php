<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servico extends Model
{
    protected $primaryKey = 'id_servico';
    protected $fillable = ['nome', 'descricao', 'preco', 'duracao_minutos'];

    public function agendamentos()
    {
        return $this->belongsToMany(Agendamento::class, 'agendamento_servico', 'servico_id', 'agendamento_id');
    }
}
