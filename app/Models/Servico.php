<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servico extends Model
{
    protected $primaryKey = 'id_servico';
    protected $fillable = ['nome', 'descricao', 'preco', 'duracao_minutos'];

    public function agendamentos()
    {
        return $this->hasMany(Agendamento::class, 'id_servico');
    }
}
