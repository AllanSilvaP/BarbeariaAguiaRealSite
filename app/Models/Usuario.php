<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $primaryKey = 'id_usuario';
    protected $fillable = ['nome', 'telefone', 'email', 'senha', 'tipo_usuario'];

    public function agendamentosFeitos()
    {
        return $this->hasMany(Agendamento::class, 'id_cliente');
    }

    public function agendamentosRecebidos()
    {
        return $this->hasMany(Agendamento::class, 'id_barbeiro');
    }

    public function pagamentos()
    {
        return $this->hasMany(Pagamento::class, 'id_cliente');
    }
}
