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
        Schema::create('pagamentos', function (Blueprint $table) {
            $table->id('id_pagamento');
            $table->foreignId('id_cliente')->constrained('usuarios', 'id_usuario');
            $table->foreignId('id_agendamento')->nullable()->constrained('agendamentos', 'id_agendamento');
            $table->decimal('valor', 10,2);
            $table->enum('forma_pagamento', ['dinheiro', 'cartão', 'pix']);
            $table->timestamp('data_pagamento')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagamentos');
    }
};
