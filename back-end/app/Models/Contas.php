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
        'categoria',
        'caixa',
        'data_vencimento',
        'valor',
        'forma_pagamento',
        'status',
        'data_pagamento',
        'num_parcela',
        'total_parcela',
        'id_parcelamento',
        'criado_em'
    ];
}
