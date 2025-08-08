<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pagamento extends Model
{
    protected $primaryKey = 'id_pagamento';
    protected $fillable = ['id_cliente', 'id_agendamento', 'valor', 'forma_pagamento'];

    public function cliente() {
        return $this->belongsTo(Usuario::class, 'id_cliente');
    }

    public function agendamento(){
        return $this->belongsTo(Agendamento::class, 'id_agendamento');
    }
}
