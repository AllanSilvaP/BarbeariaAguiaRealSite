<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contas extends Model
{
    use HasFactory;

    protected $table = 'contas';

    public $timestamps = false;

    protected $fillable = [
        'nome',
        'data_vencimento',
        'categoria_id',
        'caixa_id',
        'forma_pagamento_id',
        'valor',
        'status',
        'data_pagamento',
        'num_parcela',
        'total_parcela',
        'id_parcelamento',
        'criado_em',
        'tipo',
    ];

    public function categoria() {
        return $this->belongsTo(Categoria::class, 'categoria_id');
    }

    public function caixa() {
        return $this->belongsTo(Categoria::class, 'caixa_id');
    }

    public function formaPagamento() {
        return $this->belongsTo(Categoria::class, 'forma_pagamento_id');
    }
}
