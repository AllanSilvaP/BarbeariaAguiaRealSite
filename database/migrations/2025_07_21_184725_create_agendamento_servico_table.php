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
        Schema::create('agendamento_servico', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('agendamento_id');
            $table->unsignedBigInteger('servico_id');

            $table->foreign('agendamento_id')
                ->references('id_agendamento')->on('agendamentos')
                ->onDelete('cascade');

            $table->foreign('servico_id')
                ->references('id_servico')->on('servicos')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agendamento_servico');
    }
};
