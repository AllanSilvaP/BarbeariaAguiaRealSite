<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('clientes', function (Blueprint $table) {
            $table->id('id_cliente');
            $table->string('nome', 100);
            $table->string('telefone', 20);
            $table->string('email', 100)->unique();
            $table->string('senha', 255);
            $table->dateTime('data_cadastro');
            $table->timestamps();
        });

        Schema::create('barbeiros', function (Blueprint $table) {
            $table->id('id_barbeiro');
            $table->string('nome', 100);
            $table->string('telefone', 20);
            $table->string('email', 100)->unique();
            $table->string('senha', 255);
            $table->enum('tipo_usuario', ['admin', 'barbeiro']);
            $table->timestamps();
        });

        Schema::create('servicos', function (Blueprint $table) {
            $table->id('id_servico');
            $table->string('nome', 100);
            $table->text('descricao');
            $table->decimal('preco', 10, 2);
            $table->integer('duracao_minutos');
            $table->timestamps();
        });

        Schema::create('agendamentos', function (Blueprint $table) {
            $table->id('id_agendamento');
            $table->foreignId('id_cliente')->constrained('clientes')->onDelete('cascade');
            $table->foreignId('id_barbeiro')->constrained('barbeiros')->onDelete('cascade');
            $table->foreignId('id_servico')->constrained('servicos')->onDelete('cascade');
            $table->dateTime('data_hora');
            $table->enum('status', ['pendente', 'confirmado', 'cancelado']);
            $table->timestamps();
        });

        Schema::create('pagamentos', function (Blueprint $table) {
            $table->id('id_pagamento');
            $table->foreignId('id_cliente')->constrained('clientes')->onDelete('cascade');
            $table->foreignId('id_agendamento')->constrained('agendamentos')->onDelete('cascade');
            $table->decimal('valor', 10, 2);
            $table->dateTime('data_pagamento');
            $table->enum('forma_pagamento', ['dinheiro', 'cartao', 'pix']);
            $table->timestamps();
        });

        Schema::create('estoque', function (Blueprint $table) {
            $table->id('id_produto');
            $table->string('nome', 100);
            $table->text('descricao');
            $table->integer('quantidade');
            $table->decimal('preco_compra', 10, 2);
            $table->decimal('preco_venda', 10, 2);
            $table->timestamps();
        });

        Schema::create('vendas', function (Blueprint $table) {
            $table->id('id_venda');
            $table->foreignId('id_cliente')->constrained('clientes')->onDelete('cascade');
            $table->dateTime('data_venda');
            $table->decimal('valor_total', 10, 2);
            $table->timestamps();
        });

        Schema::create('itens_venda', function (Blueprint $table) {
            $table->id('id_item');
            $table->foreignId('id_venda')->constrained('vendas')->onDelete('cascade');
            $table->foreignId('id_produto')->constrained('estoque')->onDelete('cascade');
            $table->integer('quantidade');
            $table->decimal('preco_unitario', 10, 2);
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('itens_venda');
        Schema::dropIfExists('vendas');
        Schema::dropIfExists('estoque');
        Schema::dropIfExists('pagamentos');
        Schema::dropIfExists('agendamentos');
        Schema::dropIfExists('servicos');
        Schema::dropIfExists('barbeiros');
        Schema::dropIfExists('clientes');
    }
};
