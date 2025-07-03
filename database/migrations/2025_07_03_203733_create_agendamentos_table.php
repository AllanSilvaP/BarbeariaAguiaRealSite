<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('agendamentos', function (Blueprint $table) {
            $table->id('id_agendamento');
            $table->foreignId('id_cliente')->constrained('usuarios', 'id_usuario');
            $table->foreignId('id_barbeiro')->constrained('usuarios', 'id_usuario');
            $table->foreignId('id_servico')->constrained('servicos', 'id_servicos');
            $table->dateTime('data_hora');
            $table->enum('status', ['pendente', 'confirmado', 'cancelado', 'concluido'])->default('pendente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agendamentos');
    }
};
