<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\Models\Usuario;

class UsuarioAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Usuario::updateOrCreate(
            ['email' => 'admin@barbearia.com'],
            [
                'nome' => 'admin',
                'telefone' => '11999999999',
                'senha' => Hash::make('admin123'),
                'tipo_usuario' => 'administrador'
            ]
            );
    }
}
