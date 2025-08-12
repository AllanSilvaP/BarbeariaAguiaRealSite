import{v as S,g as k}from"./inatividade-DwR18d54.js";import{a as A}from"./agendarColaborador-DMHV3eGx.js";async function v(o=null,n=1){const r=localStorage.getItem("token"),l=document.getElementById("secao-conteudo");if(!r||!l)return;const u=new Date().toISOString().split("T")[0];let e=o||u;typeof e!="string"&&e instanceof HTMLInputElement&&(e=e.value);try{const g=await fetch(`/api/barbeiro/me/agendamentos?data=${e}&page=${n}`,{headers:{Authorization:`Bearer ${r}`,Accept:"application/json"}});if(!g.ok)throw new Error("Erro ao buscar agendamentos!");const m=(await g.json()).data;l.innerHTML=`
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-white">Meus Agendamentos</h2>
                <div class="flex items-center">
                    <label for="filtro-data" class="text-white mr-2">Escolher dia:</label>
                    <input type="date" id="filtro-data" class="bg-gray-800 text-white rounded p-1">
                </div>
            </div>
        `;const i=document.getElementById("filtro-data");if(i&&(i.value=e,i.addEventListener("change",t=>{o=t.target.value,v(o)})),m.length===0){l.innerHTML+='<p class="text-gray-400">Sem agendamentos neste dia.</p>';const t=document.getElementById("filtro-data");t&&(t.value=e,t.addEventListener("change",c=>{o=c.target.value,v(o)}));return}m.forEach(t=>{var a,p;const c=document.createElement("div");c.className="p-3 mb-2 bg-gray-800 rounded shadow";const d=["pendente","confirmado","cancelado","concluido"].map(h=>`<option value="${h}" ${t.status===h?"selected":""}>${h}</option>`).join("");c.innerHTML=`
                <p><strong>Cliente:</strong> ${((a=t.cliente)==null?void 0:a.nome)||"N/A"}</p>
                <p><strong>Serviço:</strong> ${((p=t.servicos)==null?void 0:p.map(h=>h.nome).join(", "))||"N/A"}</p>
                <p><strong>Horário:</strong> ${new Date(t.data_hora).toLocaleString("pt-BR")}</p>
                <label class="block mt-2">
                    <span class="text-white font-medium">Status:</span>
                    <select data-id="${t.id_agendamento}" class="select-status bg-gray-700 text-white rounded p-1 mt-1">
                        ${d}
                    </select>
                </label>
                <div class="flex gap-2 mt-2">
                    <button class="btn-editar bg-blue-500 text-white px-2 py-1 rounded" data-id="${t.id_agendamento}">Editar</button>
                    <button class="btn-excluir bg-red-500 text-white px-2 py-1 rounded" data-id="${t.id_agendamento}">Excluir</button>
                </div>
            `,l.appendChild(c)}),document.querySelectorAll(".select-status").forEach(t=>{t.addEventListener("change",async c=>{const d=c.target.dataset.id,a=c.target.value;try{if(!(await fetch(`/api/barbeiro/agendamentos/${d}`,{method:"PUT",headers:{Authorization:`Bearer ${r}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({status:a})})).ok)throw new Error("Erro ao atualizar status");alert("Status atualizado com sucesso!")}catch(p){console.error(p),alert("Falha ao atualizar status.")}})}),document.querySelectorAll(".btn-excluir").forEach(t=>{t.addEventListener("click",async c=>{const d=c.target.dataset.id;if(confirm("Deseja excluir esse agendamento?"))try{if(!(await fetch(`/api/barbeiro/agendamentos/${d}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`,Accept:"application/json"}})).ok)throw new Error("Erro ao excluir agendamento");alert("Agendamento excluído com sucesso!"),v(e)}catch(a){console.error(a),alert("Esse agendamento já foi pago. Não é possível excluir.")}})}),document.querySelectorAll(".btn-editar").forEach(t=>{t.addEventListener("click",async c=>{const d=c.target.dataset.id;try{const a=await fetch(`/api/barbeiro/agendamentos/${d}`,{headers:{Authorization:`Bearer ${r}`,Accept:"application/json"}});if(!a.ok)throw new Error("Erro ao buscar agendamento");const p=await a.json();_(p)}catch(a){console.error(a),alert("Erro ao carregar dados do agendamento.")}})})}catch(g){console.error("Erro ao carregar agendamentos",g),l.innerHTML='<p class="text-red-500">Erro ao carregar agendamentos.</p>'}}async function _(o){const n=localStorage.getItem("token"),r=await fetch("/api/barbeiro/servicos",{headers:{Authorization:`Bearer ${n}`}});if(!r.ok){alert("Erro ao carregar serviços");return}const l=await r.json(),u=o.data_hora.slice(0,16),e=document.getElementById("conteudo-edicao");e.innerHTML=`
        <form id="form-editar-agendamento" class="space-y-4 p-4 bg-white shadow rounded max-w-md mx-auto">
            <h2 class="text-xl font-bold text-center">Editar Agendamento</h2>

            <label class="block">
                <span class="text-black font-semibold">Data e Hora:</span>
                <input type="datetime-local" id="editar-data-hora" class="w-full mt-1 p-2 border rounded"
                    value="${u}" required>
            </label>

            <div>
                <span class="text-black font-semibold">Serviços:</span>
                <div id="editar-servicos-checkbox" class="mt-1 space-y-1">
                    ${l.map(s=>{var m;return`
                        <label class="block text-black">
                            <input type="checkbox" name="servicos" value="${s.id_servico}" class="mr-2"
                                ${(m=o.servicos)!=null&&m.some(i=>i.id_servico===s.id_servico)?"checked":""}>
                            ${s.nome} - ${s.duracao_minutos} min
                        </label>
                    `}).join("")}
                </div>
            </div>

            <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700">
                Salvar Alterações
            </button>
        </form>
    `,document.getElementById("form-editar-agendamento").addEventListener("submit",async s=>{s.preventDefault();const m=document.getElementById("editar-data-hora").value,i=Array.from(document.querySelectorAll('input[name="servicos"]:checked')).map(t=>t.value);try{const t=await fetch(`/api/barbeiro/agendamentos/${o.id_agendamento}`,{method:"PUT",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({data_hora:m,servicos:i})});if(!t.ok){const c=await t.json();throw new Error(c.message||"Erro ao editar agendamento")}alert("Agendamento atualizado com sucesso!"),e.innerHTML=""}catch(t){console.error(t),alert("Erro ao salvar alterações")}})}async function E(){const o=localStorage.getItem("token");try{const n=await fetch("/api/barbeiro/me/pagamentos",{headers:{Authorization:`Bearer ${o}`,Accept:"application/json"}});if(!n.ok)throw new Error("Erro ao buscar pagamentos");const r=await n.json(),l=`
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
        <div id="tabela-pagamentos"></div>`;document.getElementById("secao-conteudo").innerHTML=l;const u=document.getElementById("cad-usuario");u&&u.addEventListener("click",()=>D());const e=async()=>{const m=new Date,i=new Date(m),t=new Date(m),c=m.getDay();i.setDate(m.getDate()-(c+1)%7),t.setDate(i.getDate()+6);const d=i.toISOString().split("T")[0],a=t.toISOString().split("T")[0];try{const p=await fetch(`/api/barbeiro/me/pagamentos-agrupados?data_inicio=${d}&data_fim=${a}`,{headers:{Authorization:`Bearer ${o}`,Accept:"application/json"}});if(!p.ok)throw new Error("Erro ao buscar pagamentos da semana");const h=await p.json(),b=document.getElementById("tabela-pagamentos");b.innerHTML=`
                <h3 class="font-bold text-lg mb-2">
                    Semana: ${d} até ${a}
                </h3>
                `,b.innerHTML+=h.map(w=>`
            <div class="border p-4 rounded mb-4 shadow">
                <p>Total: R$ ${parseFloat(w.total).toFixed(2)}</p>
                <ul class="mt-2 text-sm text-gray-600">
                    ${w.pagamentos.map(y=>`
  <li>
    ${new Date(y.data_pagamento).toLocaleDateString("pt-BR")} - ${y.forma_pagamento} - R$ ${y.valor}
  </li>
`).join("")}
                </ul>
            </div>
        `).join("")}catch(p){console.error(p),alert("Erro ao buscar pagamentos da semana")}};document.getElementById("aplicar-filtro").addEventListener("click",$),await $(),document.getElementById("filtro-semana").addEventListener("click",e)}catch(n){console.error(n),document.getElementById("secao-conteudo").innerHTML='<p class="text-red-500">Erro ao carregar pagamentos.</p>'}}async function D(){const o=document.getElementById("secao-conteudo"),l=`
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


        <label class="block font-medium mt-4 mb-1">Data do Pagamento</label>
            <input
                type="datetime-local"
                name="data_pagamento"
                value="${new Date().toISOString().slice(0,16)}"
                class="input w-full border p-2 rounded"
                required
            >

            <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                Cadastrar
            </button>
        </form>
    </div>
    `;o.innerHTML=l;const u=document.getElementById("select-agendamento"),e=localStorage.getItem("token"),s=await(await fetch("/api/barbeiro/me/agendamentos-concluidos",{headers:{Authorization:`Bearer ${e}`}})).json(),i=await(await fetch("/api/barbeiro/me/pagamentos",{headers:{Authorization:`Bearer ${e}`}})).json(),t=new Set(i.map(a=>a.id_agendamento)),c=s.filter(a=>!t.has(a.id_agendamento));u.innerHTML+=c.map(a=>`
        <option value="${a.id_agendamento}">
            ${a.cliente.nome} - ${new Date(a.data_hora).toLocaleString("pt-BR")}
        </option>
        `).join("");const d=document.getElementById("form-cad-pagamento");d.addEventListener("submit",async a=>{a.preventDefault();const p=localStorage.getItem("token"),h=new FormData(d),b={};h.forEach((f,x)=>b[x]=f),b.data_pagamento&&(b.data_pagamento=L(b.data_pagamento));const w=s.find(f=>f.id_agendamento==b.id_agendamento);if(!w){alert("Agendamento inválido");return}const y={id_agendamento:b.id_agendamento,id_cliente:w.id_cliente||"N|A",valor:b.valor,forma_pagamento:b.forma_pagamento,data_pagamento:b.data_pagamento};try{const f=await fetch("/api/barbeiro/pagamentos",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`,Accept:"application/json"},body:JSON.stringify(y)});if(!f.ok){const x=await f.json();throw new Error(x.message||"Erro ao cadastrar Pagamento")}alert("Pagamento cadastrado com Sucesso!"),E()}catch(f){console.error(f)}})}async function $(){const o=document.getElementById("filtro-data").value,n=localStorage.getItem("token");try{const r=await fetch(`/api/barbeiro/me/pagamentos?data_pagamento=${o}`,{headers:{Authorization:`Bearer ${n}`,Accept:"application/json"}});if(!r.ok)throw new Error("Erro na requisição");const l=await r.json(),u=document.getElementById("tabela-pagamentos");u.innerHTML=`
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
                    ${l.map(e=>{var g,s;return`
                        <tr>
                            <td class="p-2 border">${((s=(g=e.agendamento)==null?void 0:g.cliente)==null?void 0:s.nome)||"Desconhecido"}</td>
                            <td class="p-2 border">${e.valor}</td>
                            <td class="p-2 border">${e.forma_pagamento}</td>
                            <td class="p-2 border">${new Date(e.data_pagamento).toLocaleDateString("pt-BR")}</td>
                            <td class="p-2 border">
                                 <div class="flex gap-2">
                                <button class="editar-pagamento text-blue-600" data-id="${e.id_pagamento}">✏️</button>
                                <button class="excluir-pagamento text-red-600" data-id="${e.id_pagamento}">❌</button>
                            </div>
                            </td>
                        </tr>
                    `}).join("")}
                </tbody>
            </table>
        `,document.querySelectorAll(".editar-pagamento").forEach(e=>{e.addEventListener("click",g=>{const s=g.target.dataset.id;j(s)})}),document.querySelectorAll(".excluir-pagamento").forEach(e=>{e.addEventListener("click",async g=>{const s=g.target.dataset.id;if(confirm("Tem certeza que deseja excluir este pagamento?"))try{const i=localStorage.getItem("token"),t=await fetch(`/api/barbeiro/pagamentos/${s}`,{method:"DELETE",headers:{Authorization:`Bearer ${i}`,Accept:"application/json"}});if(!t.ok){const c=await t.json();throw new Error(c.message||"Erro ao excluir pagamento")}alert("Pagamento excluído com sucesso!"),E()}catch(i){console.error(i),alert("Erro ao excluir pagamento")}})})}catch(r){console.error(r),alert("Erro ao buscar pagamentos filtrados")}}async function j(o){var l;const n=document.getElementById("secao-conteudo"),r=localStorage.getItem("token");try{const u=await fetch(`/api/barbeiro/pagamentos/${o}`,{method:"PUT",headers:{Authorization:`Bearer ${r}`,Accept:"application/json"}});if(!u.ok)throw new Error("Erro ao buscar pagamento");const e=await u.json(),s=new Date().toISOString().slice(0,16),m=`
        <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
            <h2 class="text-xl font-bold mb-4">Editar Pagamento</h2>

            <form id="form-editar-pagamento" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Agendamento</label>
                    <input
                        type="text"
                        value="${new Date(((l=e.agendamento)==null?void 0:l.data_hora)||e.data_pagamento).toLocaleString("pt-BR")}"
                        class="input w-full border p-2 rounded bg-gray-100 text-gray-500"
                        disabled
                    >
                </div>

                <input
                    type="number"
                    step="0.01"
                    name="valor"
                    value="${e.valor}"
                    class="input w-full border p-2 rounded"
                    placeholder="Valor (R$)"
                    required
                >

                <select name="forma_pagamento" class="input w-full border p-2 rounded" required>
                    <option value="">Forma de Pagamento</option>
                    <option value="pix" ${e.forma_pagamento==="pix"?"selected":""}>PIX</option>
                    <option value="cartão" ${e.forma_pagamento==="cartão"?"selected":""}>Cartão</option>
                    <option value="dinheiro" ${e.forma_pagamento==="dinheiro"?"selected":""}>Dinheiro</option>
                </select>


        <label class="block font-medium mt-4 mb-1">Data do Pagamento</label>
            <input
                type="datetime-local"
                name="data_pagamento"
                value="${s}"
                class="input w-full border p-2 rounded"
                required
            >

                <button
                    type="submit"
                    class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800"
                >
                    Atualizar
                </button>
            </form>
        </div>
        `;n.innerHTML=m;const i=document.getElementById("form-editar-pagamento");i.addEventListener("submit",async t=>{t.preventDefault();const c=new FormData(i),d={};c.forEach((a,p)=>{a!==""&&(d[p]=a)});try{d.data_pagamento&&(d.data_pagamento=B(d.data_pagamento));const a=await fetch(`/api/barbeiro/pagamentos/${o}`,{method:"PUT",headers:{Authorization:`Bearer ${r}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(d)});if(!a.ok){const p=await a.json();throw new Error(p.message||"Erro ao atualizar pagamento")}alert("Pagamento atualizado com sucesso!"),E()}catch(a){console.error(a),alert("Erro ao atualizar pagamento")}})}catch(u){console.error(u),n.innerHTML='<p class="text-red-600">Erro ao carregar pagamento para edição.</p>'}}function B(o){const n=new Date(o),r=i=>i.toString().padStart(2,"0"),l=n.getFullYear(),u=r(n.getMonth()+1),e=r(n.getDate()),g=r(n.getHours()),s=r(n.getMinutes()),m=r(n.getSeconds());return`${l}-${u}-${e} ${g}:${s}:${m}`}function L(o){return o.length===19?o.replace("T"," "):o.replace("T"," ")+":00"}document.addEventListener("DOMContentLoaded",()=>{S(),k(),window.renderSecao=function(o){const n=document.getElementById("secao-conteudo");if(n)switch(n.innerHTML="",o){case"Meus Pagamentos":E();break;case"Meus Agendamentos":v();break;default:n.innerHTML=`<p>Seção "${o}" não encontrada.</p>`}},window.renderSecao("Meus Agendamentos"),A("barbeiro")});
