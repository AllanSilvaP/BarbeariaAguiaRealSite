import{v as S,g as A}from"./inatividade-DwR18d54.js";import{a as B}from"./agendarColaborador-D0sg5Ujo.js";async function x(){const c=localStorage.getItem("token");try{const n=await fetch("/api/admin/barbeiros",{headers:{Authorization:`Bearer ${c}`,Accept:"application/json"}});if(!n.ok)throw new Error("Erro ao buscar barbeiros");const d=await n.json(),l=`
        <div class="bg-white text-black rounded p-4 shadow-md">
            <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold mb-4">Barbeiros</h2>
            <button id="cad-barbeiro" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">Cadastrar Barbeiro</button>
            </div>
            ${d.length>0?`
                <table class="w-full text-left border">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="p-2 border">Nome</th>
                            <th class="p-2 border">Email</th>
                            <th class="p-2 border">Telefone</th>
                            <th class="p-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${d.map(a=>`
                            <tr>
                                <td class="p-2 border">${a.nome}</td>
                                <td class="p-2 border">${a.email}</td>
                                <td class="p-2 border">${a.telefone}</td>
                                <td class="p-2 border flex gap-2">
                                    <button class="editar-barbeiro text-blue-600" data-id="${a.id_usuario}">✏️</button>
                                    <button class="excluir-barbeiro text-red-600" data-id="${a.id_usuario}">❌</button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            `:'<p class="text-gray-500">Nenhum barbeiro cadastrado.</p>'}
        </div>`,i=document.getElementById("secao-conteudo");if(!i){console.error('Elemento com id "secao-conteudo" não encontrado.');return}i.innerHTML=l;const s=document.getElementById("cad-barbeiro");s&&s.addEventListener("click",()=>j()),document.querySelectorAll(".editar-barbeiro").forEach(a=>{a.addEventListener("click",e=>{const o=e.target.dataset.id;L(o)})}),document.querySelectorAll(".excluir-barbeiro").forEach(a=>{a.addEventListener("click",async e=>{const o=e.target.dataset.id;if(confirm("Tem certeza que deseja excluir este barbeiro?"))try{const t=localStorage.getItem("token"),r=await fetch(`/api/admin/usuarios/${o}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`,Accept:"application/json"}});if(!r.ok){const m=await r.json();throw new Error(m.message||"Erro ao excluir barbeiro")}alert("Barbeiro excluído com sucesso!"),x()}catch(t){console.error(t),alert("Erro ao excluir barbeiro")}})})}catch(n){console.error(n),document.getElementById("secao-conteudo").innerHTML='<p class="text-red-500">Erro ao carregar barbeiros.</p>'}}function j(){const c=document.getElementById("secao-conteudo"),n=`
    <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-4">Cadastrar Barbeiro</h2>

        <form id="form-cad-barbeiro" class="space-y-4">
            <input type="text" name="nome" placeholder="Nome" class="input w-full border p-2 rounded" required>
            <input type="email" name="email" placeholder="Email" class="input w-full border p-2 rounded" required>
            <input type="tel" name="telefone" placeholder="Telefone" class="input w-full border p-2 rounded" required>
            <input type="password" name="senha" placeholder="Senha" class="input w-full border p-2 rounded" required>
            <input type="hidden" name="tipo_usuario" value="Barbeiro">

            <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                Cadastrar
            </button>
        </form>
    </div>
    `;c.innerHTML=n;const d=document.getElementById("form-cad-barbeiro");d.addEventListener("submit",async l=>{l.preventDefault();const i=localStorage.getItem("token"),s=new FormData(d),a={};s.forEach((e,o)=>a[o]=e);try{const e=await fetch("/api/admin/usuarios",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`,Accept:"application/json"},body:JSON.stringify(a)});if(!e.ok){const o=await e.json();throw new Error(o.message||"Erro ao cadastrar Barbeiro")}alert("Barbeiro cadastrado com Sucesso!"),x()}catch(e){console.error(e)}})}async function L(c){const n=document.getElementById("secao-conteudo"),d=localStorage.getItem("token");try{const l=await fetch(`/api/admin/usuarios/${c}`,{headers:{Authorization:`Bearer ${d}`,Accept:"application/json"}});if(!l.ok)throw new Error("Erro ao buscar barbeiro");const i=await l.json(),s=`
        <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
            <h2 class="text-xl font-bold mb-4">Editar Barbeiro</h2>

            <form id="form-editar-barbeiro" class="space-y-4">
                <input type="text" name="nome" value="${i.nome}" class="input w-full border p-2 rounded" required>
                <input type="email" name="email" value="${i.email}" class="input w-full border p-2 rounded" required>
                <input type="tel" name="telefone" value="${i.telefone}" class="input w-full border p-2 rounded" required>
                <input type="password" name="senha" placeholder="Nova senha (opcional)" class="input w-full border p-2 rounded">
                <input type="hidden" name="tipo_usuario" value="Barbeiro">

                <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                    Atualizar
                </button>
            </form>
        </div>
        `;n.innerHTML=s;const a=document.getElementById("form-editar-barbeiro");a.addEventListener("submit",async e=>{e.preventDefault();const o=new FormData(a),u={};o.forEach((t,r)=>{t!==""&&(u[r]=t)});try{const t=await fetch(`/api/admin/usuarios/${c}`,{method:"PUT",headers:{Authorization:`Bearer ${d}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(u)});if(!t.ok){const r=await t.json();throw new Error(r.message||"Erro ao atualizar barbeiro")}alert("Barbeiro atualizado com sucesso!"),x()}catch(t){console.error(t),alert("Erro ao atualizar barbeiro")}})}catch(l){console.error(l),n.innerHTML='<p class="text-red-600">Erro ao carregar barbeiro para edição.</p>'}}async function w(c=1){var d,l;const n=localStorage.getItem("token");try{const i=await fetch(`/api/admin/usuarios?page=${c}&per_page=25`,{headers:{Authorization:`Bearer ${n}`,Accept:"application/json"}});if(!i.ok)throw new Error("Erro ao buscar usuarios");const s=await i.json(),a=s.data,e=s.current_page,o=s.last_page,u=`
        <div class="bg-white text-black rounded p-4 shadow-md">
            <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold mb-4">Usuarios</h2>
            <button id="cad-usuario" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">Cadastrar Usuario</button>
            </div>
            ${a.length>0?`
                <table class="w-full text-left border">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="p-2 border">Nome</th>
                            <th class="p-2 border">Email</th>
                            <th class="p-2 border">Telefone</th>
                            <th class="p-2 border">Tipo Usuario</th>
                            <th class="p-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${a.map(r=>`
                            <tr>
                                <td class="p-2 border">${r.nome}</td>
                                <td class="p-2 border">${r.email}</td>
                                <td class="p-2 border">${r.telefone}</td>
                                <td class="p-2 border">${r.tipo_usuario}</td>
                                <td class="p-2 border flex gap-2">
                                    <button class="editar-usuario text-blue-600" data-id="${r.id_usuario}">✏️</button>
                                    <button class="excluir-usuario text-red-600" data-id="${r.id_usuario}">❌</button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                ${o>1?`
    <div class="flex justify-center mt-4 space-x-2">
        ${e>1?'<button id="anterior" class="px-4 py-2 bg-gray-300 rounded">Anterior</button>':""}
        ${e<o?'<button id="proximo" class="px-4 py-2 bg-gray-300 rounded">Próximo</button>':""}
    </div>
`:""}

            `:'<p class="text-gray-500">Nenhum usuario cadastrado.</p>'}
        </div>`;document.getElementById("secao-conteudo").innerHTML=u;const t=document.getElementById("cad-usuario");t&&t.addEventListener("click",()=>T()),document.querySelectorAll(".editar-usuario").forEach(r=>{r.addEventListener("click",m=>{const p=m.target.dataset.id;I(p)})}),document.querySelectorAll(".excluir-usuario").forEach(r=>{r.addEventListener("click",async m=>{const p=m.target.dataset.id;if(confirm("Tem certeza que deseja excluir este barbeiro?"))try{const g=localStorage.getItem("token"),f=await fetch(`/api/admin/usuarios/${p}`,{method:"DELETE",headers:{Authorization:`Bearer ${g}`,Accept:"application/json"}});if(!f.ok){const b=await f.json();throw new Error(b.message||"Erro ao excluir barbeiro")}alert("Usuario excluído com sucesso!"),w()}catch(g){console.error(g),alert("Erro ao excluir barbeiro")}})}),(d=document.getElementById("anterior"))==null||d.addEventListener("click",()=>{w(e-1)}),(l=document.getElementById("proximo"))==null||l.addEventListener("click",()=>{w(e+1)})}catch(i){console.error(i),document.getElementById("secao-conteudo").innerHTML='<p class="text-red-500">Erro ao carregar usuarios.</p>'}}function T(){const c=document.getElementById("secao-conteudo"),n=`
    <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-4">Cadastrar Usuario</h2>

        <form id="form-cad-usuario" class="space-y-4">
            <input type="text" name="nome" placeholder="Nome" class="input w-full border p-2 rounded" required>
            <input type="email" name="email" placeholder="Email" class="input w-full border p-2 rounded" required>
            <input type="tel" name="telefone" placeholder="Telefone" class="input w-full border p-2 rounded" required>
            <input type="password" name="senha" placeholder="Senha" class="input w-full border p-2 rounded" required>
            <label for="tipo_usuario">Tipo de Usuário:</label>
            <select name="tipo_usuario" id="tipo_usuario" required>
                <option value="">Selecione o tipo</option>
                <option value="administrador">Administrador</option>
                <option value="barbeiro">Barbeiro</option>
                <option value="cliente">Cliente</option>
            </select>

            <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                Cadastrar
            </button>
        </form>
    </div>
    `;c.innerHTML=n;const d=document.getElementById("form-cad-usuario");d.addEventListener("submit",async l=>{l.preventDefault();const i=localStorage.getItem("token"),s=new FormData(d),a={};s.forEach((e,o)=>a[o]=e);try{const e=await fetch("/api/admin/usuarios",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`,Accept:"application/json"},body:JSON.stringify(a)});if(!e.ok){const o=await e.json();throw new Error(o.message||"Erro ao cadastrar Usuario")}alert("Usuario cadastrado com Sucesso!"),w()}catch(e){console.error(e)}})}async function I(c){const n=document.getElementById("secao-conteudo"),d=localStorage.getItem("token");try{const l=await fetch(`/api/admin/usuarios/${c}`,{headers:{Authorization:`Bearer ${d}`,Accept:"application/json"}});if(!l.ok)throw new Error("Erro ao buscar barbeiro");const i=await l.json(),s=`
        <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
            <h2 class="text-xl font-bold mb-4">Editar Usuario</h2>

            <form id="form-editar-usuario" class="space-y-4">
                <input type="text" name="nome" value="${i.nome}" class="input w-full border p-2 rounded" required>
                <input type="email" name="email" value="${i.email}" class="input w-full border p-2 rounded" required>
                <input type="tel" name="telefone" value="${i.telefone}" class="input w-full border p-2 rounded" required>
                <input type="password" name="senha" placeholder="Nova senha (opcional)" class="input w-full border p-2 rounded">
                 <label for="tipo_usuario">Tipo de Usuário:</label>
            <select name="tipo_usuario" id="tipo_usuario" required>
                <option value="">Selecione o tipo</option>
                <option value="administrador">Administrador</option>
                <option value="barbeiro">Barbeiro</option>
                <option value="cliente">Cliente</option>
            </select>

                <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                    Atualizar
                </button>
            </form>
        </div>
        `;n.innerHTML=s;const a=document.getElementById("form-editar-usuario");a.addEventListener("submit",async e=>{e.preventDefault();const o=new FormData(a),u={};o.forEach((t,r)=>{t!==""&&(u[r]=t)});try{const t=await fetch(`/api/admin/usuarios/${c}`,{method:"PUT",headers:{Authorization:`Bearer ${d}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(u)});if(!t.ok){const r=await t.json();throw new Error(r.message||"Erro ao atualizar barbeiro")}alert("Usuario atualizado com sucesso!"),w()}catch(t){console.error(t),alert("Erro ao atualizar barbeiro")}})}catch(l){console.error(l),n.innerHTML='<p class="text-red-600">Erro ao carregar barbeiro para edição.</p>'}}async function E(){const c=localStorage.getItem("token");try{const n=await fetch("/api/admin/servicos",{headers:{Authorization:`Bearer ${c}`,Accept:"application/json"}});if(!n.ok)throw new Error("Erro ao buscar servicos");const d=await n.json(),l=`
        <div class="bg-white text-black rounded p-4 shadow-md">
            <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold mb-4">Servicos</h2>
            <button id="cad-usuario" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">Cadastrar Servico</button>
            </div>
            ${d.length>0?`
                <table class="w-full text-left border">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="p-2 border">Nome</th>
                            <th class="p-2 border">Descricao</th>
                            <th class="p-2 border">Preço</th>
                            <th class="p-2 border">Duracao Minutos</th>
                            <th class="p-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${d.map(s=>`
                            <tr>
                                <td class="p-2 border">${s.nome}</td>
                                <td class="p-2 border">${s.descricao}</td>
                                <td class="p-2 border">${s.preco}</td>
                                <td class="p-2 border">${s.duracao_minutos}</td>
                                <td class="p-2 border flex gap-2">
                                    <button class="editar-servico text-blue-600" data-id="${s.id_servico}">✏️</button>
                                    <button class="excluir-servico text-red-600" data-id="${s.id_servico}">❌</button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            `:'<p class="text-gray-500">Nenhum servico cadastrado.</p>'}
        </div>`;document.getElementById("secao-conteudo").innerHTML=l;const i=document.getElementById("cad-usuario");i&&i.addEventListener("click",()=>_()),document.querySelectorAll(".editar-servico").forEach(s=>{s.addEventListener("click",a=>{const e=a.target.dataset.id;D(e)})}),document.querySelectorAll(".excluir-servico").forEach(s=>{s.addEventListener("click",async a=>{const e=a.target.dataset.id;if(confirm("Tem certeza que deseja excluir este servico?"))try{const u=localStorage.getItem("token"),t=await fetch(`/api/admin/servicos/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${u}`,Accept:"application/json"}});if(!t.ok){const r=await t.json();throw new Error(r.message||"Erro ao excluir servico")}alert("Servico excluído com sucesso!"),E()}catch(u){console.error(u),alert("Erro ao excluir servico")}})})}catch(n){console.error(n),document.getElementById("secao-conteudo").innerHTML='<p class="text-red-500">Erro ao carregar servicos.</p>'}}function _(){const c=document.getElementById("secao-conteudo"),n=`
    <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-4">Cadastrar Servico</h2>

        <form id="form-cad-usuario" class="space-y-4">
            <input type="text" name="nome" placeholder="Nome" class="input w-full border p-2 rounded" required>
            <textarea name="descricao" placeholder="Digite a descrição..." maxlenght="60" class="input w-full border p-2 rounded" required></textarea>
            <input type="integer" name="preco" placeholder="Preço" class="input w-full border p-2 rounded" required>
            <input type="integer" name="duracao_minutos" placeholder="Duração em minutos" class="input w-full border p-2 rounded" required>
            <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                Cadastrar
            </button>
        </form>
    </div>
    `;c.innerHTML=n;const d=document.getElementById("form-cad-usuario");d.addEventListener("submit",async l=>{l.preventDefault();const i=localStorage.getItem("token"),s=new FormData(d),a={};s.forEach((e,o)=>a[o]=e);try{const e=await fetch("/api/admin/servicos",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`,Accept:"application/json"},body:JSON.stringify(a)});if(!e.ok){const o=await e.json();throw new Error(o.message||"Erro ao cadastrar Servico")}alert("Servico cadastrado com Sucesso!"),E()}catch(e){console.error(e)}})}async function D(c){const n=document.getElementById("secao-conteudo"),d=localStorage.getItem("token");try{const l=await fetch(`/api/admin/servicos/${c}`,{headers:{Authorization:`Bearer ${d}`,Accept:"application/json"}});if(!l.ok)throw new Error("Erro ao buscar servico");const i=await l.json(),s=`
        <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
            <h2 class="text-xl font-bold mb-4">Editar Servico</h2>

            <form id="form-editar-servico" class="space-y-4">
            <input type="text" name="nome" value="${i.nome}" class="input w-full border p-2 rounded" required>
            <textarea name="descricao" maxlenght="60" class="input w-full border p-2 rounded" required>
            ${i.descricao}
            </textarea>
            <input type="integer" name="preco" value="${i.preco}" class="input w-full border p-2 rounded" required>
            <input type="integer" name="duracao_minutos" value="${i.duracao_minutos}" class="input w-full border p-2 rounded" required>
                <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                    Atualizar
                </button>
            </form>
        </div>
        `;n.innerHTML=s;const a=document.getElementById("form-editar-servico");a.addEventListener("submit",async e=>{e.preventDefault();const o=new FormData(a),u={};o.forEach((t,r)=>{t!==""&&(u[r]=t)});try{const t=await fetch(`/api/admin/servicos/${c}`,{method:"PUT",headers:{Authorization:`Bearer ${d}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(u)});if(!t.ok){const r=await t.json();throw new Error(r.message||"Erro ao atualizar servico")}alert("Servico atualizado com sucesso!"),E()}catch(t){console.error(t),alert("Erro ao atualizar servico")}})}catch(l){console.error(l),n.innerHTML='<p class="text-red-600">Erro ao carregar servico para edição.</p>'}}async function v(c=null){const n=localStorage.getItem("token"),d=document.getElementById("secao-conteudo");if(!n||!d)return;const l=new Date().toISOString().split("T")[0],i=c||l;try{const s=await fetch(`/api/admin/barbeiros-agendamentos?data=${i}`,{headers:{Authorization:`Bearer ${n}`,Accept:"application/json"}});if(!s.ok)throw new Error("Erro ao buscar Agendamentos!");const a=await s.json();if(d.innerHTML="",a.length===0){d.innerHTML=`
                <div class="flex items-center justify-between mb-4">
                <p class="text-gray-400">Sem agendamentos nesse dia</p>
                <div class="flex items-center">
                <label for="filtro-data" class="text-white mr-2">Escolher dia:</label>
                <input type="date" id="filtro-data" class="bg-gray-800 text-white rounded p-1">
                </div>
                </div>`;const e=document.getElementById("filtro-data");e&&(e.value=i,e.addEventListener("change",o=>{c=o.target.value,v(c)}));return}a.forEach(e=>{const o=document.createElement("div");o.className="mb-6 bg-gray-900 p-4 rounded",o.innerHTML=`
            <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl mb-2 text-blue-400 font-bold">${e.nome}</h3>
            <div class="flex items-center">
            <label for="filtro-data" class="text-white mr-2">Escolher dia:</label>
            <input type="date" id="filtro-data" class="bg-gray-800 text-white rounded p-1">
            </div>
            </div>
            `,e.agendamentos.length?e.agendamentos.forEach(t=>{var p,h;const r=document.createElement("div");r.className="p-3 mb-2 bg-gray-800 rounded shadow";const m=["pendente","confirmado","cancelado","concluido"].map(g=>`<option value="${g}" ${t.status===g?"selected":""}>${g}</option>`);r.innerHTML=`
                    <p><strong>Cliente:</strong> ${((p=t.cliente)==null?void 0:p.nome)||"N/A"}</p>
                        <p><strong>Serviço:</strong> ${((h=t.servicos)==null?void 0:h.join(", "))||"N/A"}</p>
                        <p><strong>Horário:</strong> ${new Date(t.data_hora).toLocaleString("pt-BR")}</p>
                        <p><strong>Status:</strong> ${t.status}</p>
                        <label class="block mt-2">
                            <span class="text-white font-medium">Status:</span>
                            <select data-id="${t.id_agendamento}" class="select-status bg-gray-700 text-white rounded p-1 mt-1">
                                ${m}
                            </select>
                        </label>
                        <div class="flex gap-2 mt-2">
                        <button class="btn-editar bg-blue-500 text-white px-2 py-1 rounded" data-id="${t.id_agendamento}">Editar</button>
                        <button class="btn-excluir bg-red-500 text-white px-2 py-1 rounded" data-id="${t.id_agendamento}">Excluir</button>
                        </div>
                    `,o.appendChild(r)}):o.innerHTML+=`
                <div class="flex items-center justify-between mb-4">
                <p class="text-gray-400">Sem agendamentos</p>
                <div class="flex items-center">
                <label for="filtro-data" class="text-white mr-2">Escolher dia:</label>
                <input type="date" id="filtro-data" class="bg-gray-800 text-white rounded p-1">
                </div>
                </div>`;const u=o.querySelector("#filtro-data");u&&(u.value=i,u.addEventListener("change",t=>{c=t.target.value,v(c)})),d.appendChild(o)}),document.querySelectorAll(".select-status").forEach(e=>{e.addEventListener("change",async o=>{const u=o.target.dataset.id,t=o.target.value,r=localStorage.getItem("token");try{if(!(await fetch(`/api/admin/agendamentos/${u}`,{method:"PUT",headers:{Authorization:`Bearer ${r}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({status:t})})).ok)throw new Error("Erro ao atualizar status");alert("Status atualizado com sucesso!")}catch(m){console.error(m),alert("Falha ao atualizar status.")}})}),document.querySelectorAll(".btn-excluir").forEach(e=>{e.addEventListener("click",async o=>{const u=o.target.dataset.id;if(confirm("Deseja excluir esse agendamento?"))try{if(!(await fetch(`/api/admin/agendamentos/${u}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`,Accept:"application/json"}})).ok)throw new Error("Erro ao excluir agendamento");alert("Agendamento excluído com sucesso!"),v(i)}catch(r){console.error(r),alert("Esse agendamento ja foi pago. Não é possivel excluir")}})}),document.querySelectorAll(".btn-editar").forEach(e=>{e.addEventListener("click",async o=>{const u=o.target.dataset.id;try{const t=await fetch(`/api/admin/agendamentos/${u}`,{headers:{Authorization:`Bearer ${n}`,Accept:"application/json"}});if(!t.ok)throw new Error("Erro ao buscar agendamento");const r=await t.json();z(r)}catch(t){console.error(t),alert("Erro ao carregar dados do agendamento.")}})})}catch(s){console.error("Erro ao carregar agendamentos",s),d.innerHTML='<p class="text-red-500">Erro ao carregar agendamentos.</p>'}}async function z(c){const n=localStorage.getItem("token"),d=await fetch("/api/admin/servicos",{headers:{Authorization:`Bearer ${n}`}});if(!d.ok){alert("Erro ao carregar serviços");return}const l=await d.json(),i=c.data_hora.slice(0,16),s=document.getElementById("conteudo-edicao");s.innerHTML=`
        <form id="form-editar-agendamento" class="space-y-4 p-4 bg-white shadow rounded max-w-md mx-auto">
            <h2 class="text-xl font-bold text-center">Editar Agendamento</h2>

            <label class="block">
                <span class="text-black font-semibold">Data e Hora:</span>
                <input type="datetime-local" id="editar-data-hora" class="w-full mt-1 p-2 border rounded"
                    value="${i}" required>
            </label>

            <div>
                <span class="text-black font-semibold">Serviços:</span>
                <div id="editar-servicos-checkbox" class="mt-1 space-y-1">
                    ${l.map(e=>{var o;return`
                        <label class="block text-black">
                            <input type="checkbox" name="servicos" value="${e.id_servico}" class="mr-2"
                                ${(o=c.servicos)!=null&&o.some(u=>u.id_servico===e.id_servico)?"checked":""}>
                            ${e.nome} - ${e.duracao_minutos} min
                        </label>
                    `}).join("")}
                </div>
            </div>

            <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700">
                Salvar Alterações
            </button>
        </form>
    `,document.getElementById("form-editar-agendamento").addEventListener("submit",async e=>{e.preventDefault();const o=document.getElementById("editar-data-hora").value,u=Array.from(document.querySelectorAll('input[name="servicos"]:checked')).map(t=>t.value);try{const t=await fetch(`/api/admin/agendamentos/${c.id_agendamento}`,{method:"PUT",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({data_hora:o,servicos:u})});if(!t.ok){const r=await t.json();throw new Error(r.message||"Erro ao editar agendamento")}alert("Agendamento atualizado com sucesso!"),s.innerHTML=""}catch(t){console.error(t),alert("Erro ao salvar alterações")}})}async function $(){const c=localStorage.getItem("token");try{const n=await fetch("/api/admin/pagamentos",{headers:{Authorization:`Bearer ${c}`,Accept:"application/json"}});if(!n.ok)throw new Error("Erro ao buscar pagamentos");const d=await n.json(),l=`
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

                <label class="flex items-center gap-2">
                    <input type="checkbox" id="group-barbeiro">
                    Agrupar por Barbeiro
                </label>

        <button id="aplicar-filtro" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Aplicar</button>
    </div>
                    <button id="filtro-semana" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
                Semana Atual
                </button>
        <div id="tabela-pagamentos"></div>`;document.getElementById("secao-conteudo").innerHTML=l;const i=document.getElementById("cad-usuario");i&&i.addEventListener("click",()=>q());const s=async()=>{const o=new Date,u=new Date(o),t=new Date(o),r=o.getDay();u.setDate(o.getDate()-r),t.setDate(u.getDate()+6);const m=u.toISOString().split("T")[0],p=t.toISOString().split("T")[0];try{const h=await fetch(`/api/admin/pagamentos?data_inicio=${m}&data_fim=${p}&group=true`,{headers:{Authorization:`Bearer ${c}`,Accept:"application/json"}});if(!h.ok)throw new Error("Erro ao buscar pagamentos da semana");const g=await h.json(),f=document.getElementById("tabela-pagamentos");f.innerHTML=`
                <div>
                <h3 class="font-bold text-lg mb-2">Semana: ${m} - ${p}</h3>
                </div>
                `,f.innerHTML+=g.map(b=>`
            <div class="border p-4 rounded mb-4 shadow">
                <h3 class="font-bold text-lg mb-2">${b.barbeiro||"Sem nome"}</h3>
                <p>Total: R$ ${parseFloat(b.total).toFixed(2)}</p>
                <ul class="mt-2 text-sm text-gray-600">
                    ${b.pagamentos.map(y=>`<li>${new Date(y.data_pagamento).toLocaleDateString("pt-BR")} - ${y.forma_pagamento} - R$ ${y.valor}</li>`).join("")}
                </ul>
            </div>
        `).join("")}catch(h){console.error(h),alert("Erro ao buscar pagamentos da semana")}};document.getElementById("aplicar-filtro").addEventListener("click",k),await k(),document.getElementById("filtro-semana").addEventListener("click",s)}catch(n){console.error(n),document.getElementById("secao-conteudo").innerHTML='<p class="text-red-500">Erro ao carregar pagamentos.</p>'}}async function q(){const c=document.getElementById("secao-conteudo"),n=`
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
    `;c.innerHTML=n;const d=document.getElementById("select-agendamento"),l=localStorage.getItem("token"),s=await(await fetch("/api/admin/agendamentos-concluidos",{headers:{Authorization:`Bearer ${l}`}})).json(),e=await(await fetch("/api/admin/pagamentos",{headers:{Authorization:`Bearer ${l}`}})).json(),o=new Set(e.map(r=>r.id_agendamento)),u=s.filter(r=>!o.has(r.id_agendamento));d.innerHTML+=u.map(r=>`
        <option value="${r.id_agendamento}">
            ${r.cliente.nome} - ${new Date(r.data_hora).toLocaleString("pt-BR")}
        </option>
        `).join("");const t=document.getElementById("form-cad-pagamento");t.addEventListener("submit",async r=>{r.preventDefault();const m=localStorage.getItem("token"),p=new FormData(t),h={};p.forEach((b,y)=>h[y]=b);const g=s.find(b=>b.id_agendamento==h.id_agendamento);if(!g){alert("Agendamento inválido");return}const f={id_agendamento:h.id_agendamento,id_cliente:g.id_cliente||"N|A",valor:h.valor,forma_pagamento:h.forma_pagamento};try{const b=await fetch("/api/admin/pagamentos",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`,Accept:"application/json"},body:JSON.stringify(f)});if(!b.ok){const y=await b.json();throw new Error(y.message||"Erro ao cadastrar Pagamento")}console.log(b.json()),alert("Pagamento cadastrado com Sucesso!"),$()}catch(b){console.error(b)}})}async function k(){const c=document.getElementById("filtro-data").value,n=document.getElementById("group-barbeiro").checked,d=localStorage.getItem("token");try{const l=await fetch(`/api/admin/pagamentos?data_pagamento=${c}&group=${n}`,{headers:{Authorization:`Bearer ${d}`}});if(!l.ok)throw new Error("Erro na requisição");const i=await l.json(),s=document.getElementById("tabela-pagamentos");n?s.innerHTML=i.map(a=>`
                <div class="border p-4 rounded mb-4 shadow">
                <h3 class="font-bold text-lg mb-2">${a.barbeiro||"Sem nome"}</h3>
                <p>Total: R$ ${a.total.toFixed(2)}</p>
                <ul class="mt-2 text-sm text-gray-600">
                    ${a.pagamentos.map(e=>`<li>${e.forma_pagamento} - R$ ${e.valor}</li>`).join("")}
                </ul>
            </div>
                `).join(""):s.innerHTML=`
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
                    ${i.map(a=>{var e;return`
                        <tr>
                            <td class="p-2 border">${((e=a.cliente)==null?void 0:e.nome)||"Desconhecido"}</td>
                            <td class="p-2 border">${a.valor}</td>
                            <td class="p-2 border">${a.forma_pagamento}</td>
                            <td class="p-2 border">${new Date(a.data_pagamento).toLocaleDateString("pt-BR")}</td>
                            <td class="p-2 border">
                                 <div class="flex gap-2">
                                    <button class="editar-pagamento text-blue-600" data-id="${a.id_pagamento}">✏️</button>
                                    <button class="excluir-pagamento text-red-600" data-id="${a.id_pagamento}">❌</button>
                                </div>
                            </td>
                        </tr>
                    `}).join("")}
                </tbody>
            </table>
        `,document.querySelectorAll(".editar-pagamento").forEach(a=>{a.addEventListener("click",e=>{const o=e.target.dataset.id;H(o)})}),document.querySelectorAll(".excluir-pagamento").forEach(a=>{a.addEventListener("click",async e=>{const o=e.target.dataset.id;if(confirm("Tem certeza que deseja excluir este pagamento?"))try{const t=localStorage.getItem("token"),r=await fetch(`/api/admin/pagamentos/${o}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`,Accept:"application/json"}});if(!r.ok){const m=await r.json();throw new Error(m.message||"Erro ao excluir pagamento")}alert("Pagamento excluído com sucesso!"),$()}catch(t){console.error(t),alert("Erro ao excluir pagamento")}})})}catch{}}async function H(c){var l,i;const n=document.getElementById("secao-conteudo"),d=localStorage.getItem("token");try{const s=await fetch(`/api/admin/pagamentos/${c}`,{headers:{Authorization:`Bearer ${d}`,Accept:"application/json"}});if(!s.ok)throw new Error("Erro ao buscar pagamento");const a=await s.json(),e=`
        <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
            <h2 class="text-xl font-bold mb-4">Editar Pagamento</h2>

            <form id="form-editar-pagamento" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Agendamento</label>
                    <input
                        type="text"
                        value="${((l=a.cliente)==null?void 0:l.nome)||"Desconhecido"} - ${new Date(((i=a.agendamento)==null?void 0:i.data_hora)||a.data_pagamento).toLocaleString("pt-BR")}"
                        class="input w-full border p-2 rounded bg-gray-100 text-gray-500"
                        disabled
                    >
                </div>

                <input
                    type="number"
                    step="0.01"
                    name="valor"
                    value="${a.valor}"
                    class="input w-full border p-2 rounded"
                    placeholder="Valor (R$)"
                    required
                >

                <select name="forma_pagamento" class="input w-full border p-2 rounded" required>
                    <option value="">Forma de Pagamento</option>
                    <option value="pix" ${a.forma_pagamento==="pix"?"selected":""}>PIX</option>
                    <option value="cartão" ${a.forma_pagamento==="cartão"?"selected":""}>Cartão</option>
                    <option value="dinheiro" ${a.forma_pagamento==="dinheiro"?"selected":""}>Dinheiro</option>
                </select>

                <button
                    type="submit"
                    class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800"
                >
                    Atualizar
                </button>
            </form>
        </div>
        `;n.innerHTML=e;const o=document.getElementById("form-editar-pagamento");o.addEventListener("submit",async u=>{u.preventDefault();const t=new FormData(o),r={};t.forEach((m,p)=>{m!==""&&(r[p]=m)});try{const m=await fetch(`/api/admin/pagamentos/${c}`,{method:"PUT",headers:{Authorization:`Bearer ${d}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(r)});if(!m.ok){const p=await m.json();throw new Error(p.message||"Erro ao atualizar pagamento")}alert("Pagamento atualizado com sucesso!"),$()}catch(m){console.error(m),alert("Erro ao atualizar pagamento")}})}catch(s){console.error(s),n.innerHTML='<p class="text-red-600">Erro ao carregar pagamento para edição.</p>'}}document.addEventListener("DOMContentLoaded",()=>{S(),A(),window.renderSecao=function(c){const n=document.getElementById("secao-conteudo");if(n)switch(n.innerHTML="",c){case"Usuarios":w(n);break;case"Barbeiros":x();break;case"Serviços":E();break;case"Agendas":v(n);break;case"Pagamentos":$();break;default:n.innerHTML=`<p>Seção "${c}" não encontrada.</p>`}},window.renderSecao("Barbeiros"),B("admin")});
