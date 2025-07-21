<div id="modal-agendamento" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur hidden">
  <div class="bg-white p-6 rounded-lg w-full max-w-md text-black relative">
    <button id="fechar-modal" class="absolute top-2 right-2 text-red-500 font-bold">&times;</button>
    <h2 class="text-xl font-bold mb-4">Novo Agendamento</h2>

    <form id="form-agendar" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Cliente</label>
        <input id="nome-cliente" type="text" disabled class="w-full border p-2 rounded bg-gray-100" />
      </div>

      <div>
        <label class="block text-sm font-medium">Barbeiro</label>
        <select id="select-barbeiro" class="w-full border p-2 rounded"></select>
      </div>

      <div>
        <label class="block text-sm font-medium">Serviço</label>
        <select id="select-servico" class="w-full border p-2 rounded" multiple></select>
      </div>

      <div>
        <label class="block text-sm font-medium">Data e Hora</label>
        <input type="datetime-local" id="data-hora" class="w-full border p-2 rounded" required />
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Confirmar Agendamento</button>
    </form>
  </div>
</div>
