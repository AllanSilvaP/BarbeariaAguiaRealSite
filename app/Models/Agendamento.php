<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agendamento extends Model
{
    protected $primaryKey = 'id_servico';
    protected $fillable = ['id_cliente', 'id_barbeiro', 'id_servico', 'data_hora', 'status'];

    public function cliente() {
        return $this->belongsTo(Usuario::class, 'id_cliente');
    }

    public function barbeiro() {
        return $this->belongsTo(Usuario::class, 'id_barbeiro');
    }

    public function servico() {
        return $this->belongsTo(Servico::class, 'id_servico');
    }
}
