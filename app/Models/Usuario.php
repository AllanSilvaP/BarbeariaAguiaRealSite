<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Usuario extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $primaryKey = 'id_usuario';
    protected $fillable = ['nome', 'telefone', 'email', 'tipo_usuario'];
    protected $hidden = [
        'senha',
    ];

    public function getAuthPassword()
    {
        return $this->senha;
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

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
