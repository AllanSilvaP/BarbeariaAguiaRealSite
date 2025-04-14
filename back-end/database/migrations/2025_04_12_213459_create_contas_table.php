<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('contas', function (Blueprint $table) {
            $table->id();
            $table->string('nome');

            // Referências para a tabela 'categorias'
            $table->unsignedBigInteger('categoria_id');
            $table->unsignedBigInteger('caixa_id');
            $table->unsignedBigInteger('forma_pagamento_id');

            $table->date('data_vencimento');
            $table->decimal('valor', 10, 2);
            $table->string('status');
            $table->date('data_pagamento')->nullable();
            $table->integer('num_parcela')->nullable();
            $table->integer('total_parcela')->nullable();
            $table->integer('id_parcelamento')->nullable();
            $table->timestamp('criado_em')->useCurrent();
            $table->string('tipo');

            // FKs (não obrigatório se quiser só o ID, mas recomendado)
            $table->foreign('categoria_id')->references('id')->on('categorias');
            $table->foreign('caixa_id')->references('id')->on('categorias');
            $table->foreign('forma_pagamento_id')->references('id')->on('categorias');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contas');
    }
};
