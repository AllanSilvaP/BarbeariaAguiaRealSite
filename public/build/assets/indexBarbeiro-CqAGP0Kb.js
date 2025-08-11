import{v as x,g as $}from"./inatividade-DwR18d54.js";import{a as A}from"./agendarColaborador-D0sg5Ujo.js";async function v(o=null,n=1){const i=localStorage.getItem("token"),d=document.getElementById("secao-conteudo");if(!i||!d)return;const g=new Date().toISOString().split("T")[0];let t=o||g;typeof t!="string"&&t instanceof HTMLInputElement&&(t=t.value);try{const p=await fetch(`/api/barbeiro/me/agendamentos?data=${t}&page=${n}`,{headers:{Authorization:`Bearer ${i}`,Accept:"application/json"}});if(!p.ok)throw new Error("Erro ao buscar agendamentos!");const l=(await p.json()).data;d.innerHTML=`
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-white">Meus Agendamentos</h2>
                <div class="flex items-center">
                    <label for="filtro-data" class="text-white mr-2">Escolher dia:</label>
                    <input type="date" id="filtro-data" class="bg-gray-800 text-white rounded p-1">
                </div>
            </div>
        `;const r=document.getElementById("filtro-data");if(r&&(r.value=t,r.addEventListener("change",e=>{o=e.target.value,v(o)})),l.length===0){d.innerHTML+='<p class="text-gray-400">Sem agendamentos neste dia. FUNCIONADNO</p>',r&&(r.value=t,r.addEventListener("change",e=>{o=e.target.value,v(o)}));return}l.forEach(e=>{var m,c;const a=document.createElement("div");a.className="p-3 mb-2 bg-gray-800 rounded shadow";const u=["pendente","confirmado","cancelado","concluido"].map(h=>`<option value="${h}" ${e.status===h?"selected":""}>${h}</option>`).join("");a.innerHTML=`
                <p><strong>Cliente:</strong> ${((m=e.cliente)==null?void 0:m.nome)||"N/A"}</p>
                <p><strong>Serviço:</strong> ${((c=e.servicos)==null?void 0:c.map(h=>h.nome).join(", "))||"N/A"}</p>
                <p><strong>Horário:</strong> ${new Date(e.data_hora).toLocaleString("pt-BR")}</p>
                <label class="block mt-2">
                    <span class="text-white font-medium">Status:</span>
                    <select data-id="${e.id_agendamento}" class="select-status bg-gray-700 text-white rounded p-1 mt-1">
                        ${u}
                    </select>
                </label>
                <div class="flex gap-2 mt-2">
                    <button class="btn-editar bg-blue-500 text-white px-2 py-1 rounded" data-id="${e.id_agendamento}">Editar</button>
                    <button class="btn-excluir bg-red-500 text-white px-2 py-1 rounded" data-id="${e.id_agendamento}">Excluir</button>
                </div>
            `,d.appendChild(a)}),document.querySelectorAll(".select-status").forEach(e=>{e.addEventListener("change",async a=>{const u=a.target.dataset.id,m=a.target.value;try{if(!(await fetch(`/api/barbeiro/agendamentos/${u}`,{method:"PUT",headers:{Authorization:`Bearer ${i}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({status:m})})).ok)throw new Error("Erro ao atualizar status");alert("Status atualizado com sucesso!")}catch(c){console.error(c),alert("Falha ao atualizar status.")}})}),document.querySelectorAll(".btn-excluir").forEach(e=>{e.addEventListener("click",async a=>{const u=a.target.dataset.id;if(confirm("Deseja excluir esse agendamento?"))try{if(!(await fetch(`/api/barbeiro/agendamentos/${u}`,{method:"DELETE",headers:{Authorization:`Bearer ${i}`,Accept:"application/json"}})).ok)throw new Error("Erro ao excluir agendamento");alert("Agendamento excluído com sucesso!"),v(t)}catch(m){console.error(m),alert("Esse agendamento já foi pago. Não é possível excluir.")}})}),document.querySelectorAll(".btn-editar").forEach(e=>{e.addEventListener("click",async a=>{const u=a.target.dataset.id;try{const m=await fetch(`/api/barbeiro/agendamentos/${u}`,{headers:{Authorization:`Bearer ${i}`,Accept:"application/json"}});if(!m.ok)throw new Error("Erro ao buscar agendamento");const c=await m.json();k(c)}catch(m){console.error(m),alert("Erro ao carregar dados do agendamento.")}})})}catch(p){console.error("Erro ao carregar agendamentos",p),d.innerHTML='<p class="text-red-500">Erro ao carregar agendamentos.</p>'}}async function k(o){const n=localStorage.getItem("token"),i=await fetch("/api/barbeiro/servicos",{headers:{Authorization:`Bearer ${n}`}});if(!i.ok){alert("Erro ao carregar serviços");return}const d=await i.json(),g=o.data_hora.slice(0,16),t=document.getElementById("conteudo-edicao");t.innerHTML=`
        <form id="form-editar-agendamento" class="space-y-4 p-4 bg-white shadow rounded max-w-md mx-auto">
            <h2 class="text-xl font-bold text-center">Editar Agendamento</h2>

            <label class="block">
                <span class="text-black font-semibold">Data e Hora:</span>
                <input type="datetime-local" id="editar-data-hora" class="w-full mt-1 p-2 border rounded"
                    value="${g}" required>
            </label>

            <div>
                <span class="text-black font-semibold">Serviços:</span>
                <div id="editar-servicos-checkbox" class="mt-1 space-y-1">
                    ${d.map(s=>{var l;return`
                        <label class="block text-black">
                            <input type="checkbox" name="servicos" value="${s.id_servico}" class="mr-2"
                                ${(l=o.servicos)!=null&&l.some(r=>r.id_servico===s.id_servico)?"checked":""}>
                            ${s.nome} - ${s.duracao_minutos} min
                        </label>
                    `}).join("")}
                </div>
            </div>

            <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700">
                Salvar Alterações
            </button>
        </form>
    `,document.getElementById("form-editar-agendamento").addEventListener("submit",async s=>{s.preventDefault();const l=document.getElementById("editar-data-hora").value,r=Array.from(document.querySelectorAll('input[name="servicos"]:checked')).map(e=>e.value);try{const e=await fetch(`/api/barbeiro/agendamentos/${o.id_agendamento}`,{method:"PUT",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({data_hora:l,servicos:r})});if(!e.ok){const a=await e.json();throw new Error(a.message||"Erro ao editar agendamento")}alert("Agendamento atualizado com sucesso!"),t.innerHTML=""}catch(e){console.error(e),alert("Erro ao salvar alterações")}})}async function y(){const o=localStorage.getItem("token");try{const n=await fetch("/api/barbeiro/me/pagamentos",{headers:{Authorization:`Bearer ${o}`,Accept:"application/json"}});if(!n.ok)throw new Error("Erro ao buscar pagamentos");const i=await n.json(),d=`
        <div class="bg-white text-black rounded p-4 shadow-md">
            <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold mb-4">Pagamentos</h2>
            <button id="cad-usuario" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">Cadastrar Pagamento</button>
            </div>

            <div class="flex items-center gap-4 mb-4">
                <label>
                    Data:
                    <input type="date" id="filtro-data" class="border p-2 rounded" value="${new Date().toISOString().split("T")[0]}">
                </label>

        <button id="aplicar-filtro" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Aplicar</button>
    </div>
                    <button id="filtro-semana" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
                Semana Atual
                </button>
        <div id="tabela-pagamentos"></div>`;document.getElementById("secao-conteudo").innerHTML=d;const g=document.getElementById("cad-usuario");g&&g.addEventListener("click",()=>S());const t=async()=>{const l=new Date,r=new Date(l),e=new Date(l),a=l.getDay();r.setDate(l.getDate()-(a+1)%7),e.setDate(r.getDate()+6);const u=r.toISOString().split("T")[0],m=e.toISOString().split("T")[0];try{const c=await fetch(`/api/barbeiro/me/pagamentos-agrupados?data_inicio=${u}&data_fim=${m}`,{headers:{Authorization:`Bearer ${o}`,Accept:"application/json"}});if(!c.ok)throw new Error("Erro ao buscar pagamentos da semana");const h=await c.json(),w=document.getElementById("tabela-pagamentos");w.innerHTML=`
                <h3 class="font-bold text-lg mb-2">
                    Semana: ${u} até ${m}
                </h3>
                `,w.innerHTML+=h.map(b=>`
            <div class="border p-4 rounded mb-4 shadow">
                <p>Total: R$ ${parseFloat(b.total).toFixed(2)}</p>
                <ul class="mt-2 text-sm text-gray-600">
                    ${b.pagamentos.map(f=>`
  <li>
    ${new Date(f.data_pagamento).toLocaleDateString("pt-BR")} - ${f.forma_pagamento} - R$ ${f.valor}
  </li>
`).join("")}
                </ul>
            </div>
        `).join("")}catch(c){console.error(c),alert("Erro ao buscar pagamentos da semana")}};document.getElementById("aplicar-filtro").addEventListener("click",E),await E(),document.getElementById("filtro-semana").addEventListener("click",t)}catch(n){console.error(n),document.getElementById("secao-conteudo").innerHTML='<p class="text-red-500">Erro ao carregar pagamentos.</p>'}}async function S(){const o=document.getElementById("secao-conteudo"),n=`
    <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-4">Cadastrar Pagamento</h2>

        <form id="form-cad-pagamento" class="space-y-4">
            <select name="id_agendamento" id="select-agendamento" class="input w-full border p-2 rounded" required>
            <option value="">Selecione um agendamento concluído</option>
        </select>

        <input type="number" name="valor" placeholder="Valor (R$)" class="input w-full border p-2 rounded" required>

        <select name="forma_pagamento" class="input w-full border p-2 rounded" required>
            <option value="">Forma de Pagamento</option>
            <option value="pix">PIX</option>
            <option value="cartão">Cartão</option>
            <option value="dinheiro">Dinheiro</option>
        </select>
            <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                Cadastrar
            </button>
        </form>
    </div>
    `;o.innerHTML=n;const i=document.getElementById("select-agendamento"),d=localStorage.getItem("token"),t=await(await fetch("/api/barbeiro/me/agendamentos-concluidos",{headers:{Authorization:`Bearer ${d}`}})).json(),s=await(await fetch("/api/barbeiro/me/pagamentos",{headers:{Authorization:`Bearer ${d}`}})).json(),l=new Set(s.map(a=>a.id_agendamento)),r=t.filter(a=>!l.has(a.id_agendamento));i.innerHTML+=r.map(a=>`
        <option value="${a.id_agendamento}">
            ${a.cliente.nome} - ${new Date(a.data_hora).toLocaleString("pt-BR")}
        </option>
        `).join("");const e=document.getElementById("form-cad-pagamento");e.addEventListener("submit",async a=>{a.preventDefault();const u=localStorage.getItem("token"),m=new FormData(e),c={};m.forEach((b,f)=>c[f]=b);const h=t.find(b=>b.id_agendamento==c.id_agendamento);if(!h){alert("Agendamento inválido");return}const w={id_agendamento:c.id_agendamento,id_cliente:h.id_cliente||"N|A",valor:c.valor,forma_pagamento:c.forma_pagamento};try{const b=await fetch("/api/barbeiro/pagamentos",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`,Accept:"application/json"},body:JSON.stringify(w)});if(!b.ok){const f=await b.json();throw new Error(f.message||"Erro ao cadastrar Pagamento")}alert("Pagamento cadastrado com Sucesso!"),y()}catch(b){console.error(b)}})}async function E(){const o=document.getElementById("filtro-data").value,n=localStorage.getItem("token");try{const i=await fetch(`/api/barbeiro/me/pagamentos?data_pagamento=${o}`,{headers:{Authorization:`Bearer ${n}`,Accept:"application/json"}});if(!i.ok)throw new Error("Erro na requisição");const d=await i.json(),g=document.getElementById("tabela-pagamentos");g.innerHTML=`
            <table class="w-full text-left border">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="p-2 border">Nome Cliente</th>
                        <th class="p-2 border">Valor</th>
                        <th class="p-2 border">Forma</th>
                        <th class="p-2 border">Data</th>
                        <th class="p-2 border">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${d.map(t=>{var p,s;return`
                        <tr>
                            <td class="p-2 border">${((s=(p=t.agendamento)==null?void 0:p.cliente)==null?void 0:s.nome)||"Desconhecido"}</td>
                            <td class="p-2 border">${t.valor}</td>
                            <td class="p-2 border">${t.forma_pagamento}</td>
                            <td class="p-2 border">${new Date(t.data_pagamento).toLocaleDateString("pt-BR")}</td>
                            <td class="p-2 border">
                                 <div class="flex gap-2">
                                <button class="editar-pagamento text-blue-600" data-id="${t.id_pagamento}">✏️</button>
                                <button class="excluir-pagamento text-red-600" data-id="${t.id_pagamento}">❌</button>
                            </div>
                            </td>
                        </tr>
                    `}).join("")}
                </tbody>
            </table>
        `,document.querySelectorAll(".editar-pagamento").forEach(t=>{t.addEventListener("click",p=>{const s=p.target.dataset.id;j(s)})}),document.querySelectorAll(".excluir-pagamento").forEach(t=>{t.addEventListener("click",async p=>{const s=p.target.dataset.id;if(confirm("Tem certeza que deseja excluir este pagamento?"))try{const r=localStorage.getItem("token"),e=await fetch(`/api/barbeiro/pagamentos/${s}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`,Accept:"application/json"}});if(!e.ok){const a=await e.json();throw new Error(a.message||"Erro ao excluir pagamento")}alert("Pagamento excluído com sucesso!"),y()}catch(r){console.error(r),alert("Erro ao excluir pagamento")}})})}catch(i){console.error(i),alert("Erro ao buscar pagamentos filtrados")}}async function j(o){var d;const n=document.getElementById("secao-conteudo"),i=localStorage.getItem("token");try{const g=await fetch(`/api/barbeiro/pagamentos/${o}`,{method:"PUT",headers:{Authorization:`Bearer ${i}`,Accept:"application/json"}});if(!g.ok)throw new Error("Erro ao buscar pagamento");const t=await g.json(),p=`
        <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
            <h2 class="text-xl font-bold mb-4">Editar Pagamento</h2>

            <form id="form-editar-pagamento" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Agendamento</label>
                    <input
                        type="text"
                        value="${new Date(((d=t.agendamento)==null?void 0:d.data_hora)||t.data_pagamento).toLocaleString("pt-BR")}"
                        class="input w-full border p-2 rounded bg-gray-100 text-gray-500"
                        disabled
                    >
                </div>

                <input
                    type="number"
                    step="0.01"
                    name="valor"
                    value="${t.valor}"
                    class="input w-full border p-2 rounded"
                    placeholder="Valor (R$)"
                    required
                >

                <select name="forma_pagamento" class="input w-full border p-2 rounded" required>
                    <option value="">Forma de Pagamento</option>
                    <option value="pix" ${t.forma_pagamento==="pix"?"selected":""}>PIX</option>
                    <option value="cartão" ${t.forma_pagamento==="cartão"?"selected":""}>Cartão</option>
                    <option value="dinheiro" ${t.forma_pagamento==="dinheiro"?"selected":""}>Dinheiro</option>
                </select>

                <button
                    type="submit"
                    class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800"
                >
                    Atualizar
                </button>
            </form>
        </div>
        `;n.innerHTML=p;const s=document.getElementById("form-editar-pagamento");s.addEventListener("submit",async l=>{l.preventDefault();const r=new FormData(s),e={};r.forEach((a,u)=>{a!==""&&(e[u]=a)});try{const a=await fetch(`/api/barbeiro/pagamentos/${o}`,{method:"PUT",headers:{Authorization:`Bearer ${i}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});if(!a.ok){const u=await a.json();throw new Error(u.message||"Erro ao atualizar pagamento")}alert("Pagamento atualizado com sucesso!"),y()}catch(a){console.error(a),alert("Erro ao atualizar pagamento")}})}catch(g){console.error(g),n.innerHTML='<p class="text-red-600">Erro ao carregar pagamento para edição.</p>'}}document.addEventListener("DOMContentLoaded",()=>{x(),$(),window.renderSecao=function(o){const n=document.getElementById("secao-conteudo");if(n)switch(n.innerHTML="",o){case"Meus Pagamentos":y();break;case"Meus Agendamentos":v();break;default:n.innerHTML=`<p>Seção "${o}" não encontrada.</p>`}},window.renderSecao("Meus Agendamentos"),A("barbeiro")});
