import{v as j,g as T}from"./inatividade-DwR18d54.js";import{a as L}from"./agendarColaborador-DMHV3eGx.js";async function E(){const n=localStorage.getItem("token");try{const o=await fetch("/api/admin/barbeiros",{headers:{Authorization:`Bearer ${n}`,Accept:"application/json"}});if(!o.ok)throw new Error("Erro ao buscar barbeiros");const i=await o.json(),u=`
        <div class="bg-white text-black rounded p-4 shadow-md">
            <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold mb-4">Barbeiros</h2>
            <button id="cad-barbeiro" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">Cadastrar Barbeiro</button>
            </div>
            ${i.length>0?`
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
                        ${i.map(r=>`
                            <tr>
                                <td class="p-2 border">${r.nome}</td>
                                <td class="p-2 border">${r.email}</td>
                                <td class="p-2 border">${r.telefone}</td>
                                <td class="p-2 border flex gap-2">
                                    <button class="editar-barbeiro text-blue-600" data-id="${r.id_usuario}">✏️</button>
                                    <button class="excluir-barbeiro text-red-600" data-id="${r.id_usuario}">❌</button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            `:'<p class="text-gray-500">Nenhum barbeiro cadastrado.</p>'}
        </div>`,d=document.getElementById("secao-conteudo");if(!d){console.error('Elemento com id "secao-conteudo" não encontrado.');return}d.innerHTML=u;const s=document.getElementById("cad-barbeiro");s&&s.addEventListener("click",()=>I()),document.querySelectorAll(".editar-barbeiro").forEach(r=>{r.addEventListener("click",e=>{const t=e.target.dataset.id;_(t)})}),document.querySelectorAll(".excluir-barbeiro").forEach(r=>{r.addEventListener("click",async e=>{const t=e.target.dataset.id;if(confirm("Tem certeza que deseja excluir este barbeiro?"))try{const a=localStorage.getItem("token"),l=await fetch(`/api/admin/usuarios/${t}`,{method:"DELETE",headers:{Authorization:`Bearer ${a}`,Accept:"application/json"}});if(!l.ok){const p=await l.json();throw new Error(p.message||"Erro ao excluir barbeiro")}alert("Barbeiro excluído com sucesso!"),E()}catch(a){console.error(a),alert("Erro ao excluir barbeiro")}})})}catch(o){console.error(o),document.getElementById("secao-conteudo").innerHTML='<p class="text-red-500">Erro ao carregar barbeiros.</p>'}}function I(){const n=document.getElementById("secao-conteudo"),o=`
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
    `;n.innerHTML=o;const i=document.getElementById("form-cad-barbeiro");i.addEventListener("submit",async u=>{u.preventDefault();const d=localStorage.getItem("token"),s=new FormData(i),r={};s.forEach((e,t)=>r[t]=e);try{const e=await fetch("/api/admin/usuarios",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`,Accept:"application/json"},body:JSON.stringify(r)});if(!e.ok){const t=await e.json();throw new Error(t.message||"Erro ao cadastrar Barbeiro")}alert("Barbeiro cadastrado com Sucesso!"),E()}catch(e){console.error(e)}})}async function _(n){const o=document.getElementById("secao-conteudo"),i=localStorage.getItem("token");try{const u=await fetch(`/api/admin/usuarios/${n}`,{headers:{Authorization:`Bearer ${i}`,Accept:"application/json"}});if(!u.ok)throw new Error("Erro ao buscar barbeiro");const d=await u.json(),s=`
        <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
            <h2 class="text-xl font-bold mb-4">Editar Barbeiro</h2>

            <form id="form-editar-barbeiro" class="space-y-4">
                <input type="text" name="nome" value="${d.nome}" class="input w-full border p-2 rounded" required>
                <input type="email" name="email" value="${d.email}" class="input w-full border p-2 rounded" required>
                <input type="tel" name="telefone" value="${d.telefone}" class="input w-full border p-2 rounded" required>
                <input type="password" name="senha" placeholder="Nova senha (opcional)" class="input w-full border p-2 rounded">
                <input type="hidden" name="tipo_usuario" value="Barbeiro">

                <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                    Atualizar
                </button>
            </form>
        </div>
        `;o.innerHTML=s;const r=document.getElementById("form-editar-barbeiro");r.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(r),c={};t.forEach((a,l)=>{a!==""&&(c[l]=a)});try{const a=await fetch(`/api/admin/usuarios/${n}`,{method:"PUT",headers:{Authorization:`Bearer ${i}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(c)});if(!a.ok){const l=await a.json();throw new Error(l.message||"Erro ao atualizar barbeiro")}alert("Barbeiro atualizado com sucesso!"),E()}catch(a){console.error(a),alert("Erro ao atualizar barbeiro")}})}catch(u){console.error(u),o.innerHTML='<p class="text-red-600">Erro ao carregar barbeiro para edição.</p>'}}async function w(n=1){var i,u;const o=localStorage.getItem("token");try{const d=await fetch(`/api/admin/usuarios?page=${n}&per_page=25`,{headers:{Authorization:`Bearer ${o}`,Accept:"application/json"}});if(!d.ok)throw new Error("Erro ao buscar usuarios");const s=await d.json(),r=s.data,e=s.current_page,t=s.last_page,c=`
        <div class="bg-white text-black rounded p-4 shadow-md">
            <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold mb-4">Usuarios</h2>
            <button id="cad-usuario" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">Cadastrar Usuario</button>
            </div>
            ${r.length>0?`
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
                        ${r.map(l=>`
                            <tr>
                                <td class="p-2 border">${l.nome}</td>
                                <td class="p-2 border">${l.email}</td>
                                <td class="p-2 border">${l.telefone}</td>
                                <td class="p-2 border">${l.tipo_usuario}</td>
                                <td class="p-2 border flex gap-2">
                                    <button class="editar-usuario text-blue-600" data-id="${l.id_usuario}">✏️</button>
                                    <button class="excluir-usuario text-red-600" data-id="${l.id_usuario}">❌</button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                ${t>1?`
    <div class="flex justify-center mt-4 space-x-2">
        ${e>1?'<button id="anterior" class="px-4 py-2 bg-gray-300 rounded">Anterior</button>':""}
        ${e<t?'<button id="proximo" class="px-4 py-2 bg-gray-300 rounded">Próximo</button>':""}
    </div>
`:""}

            `:'<p class="text-gray-500">Nenhum usuario cadastrado.</p>'}
        </div>`;document.getElementById("secao-conteudo").innerHTML=c;const a=document.getElementById("cad-usuario");a&&a.addEventListener("click",()=>D()),document.querySelectorAll(".editar-usuario").forEach(l=>{l.addEventListener("click",p=>{const m=p.target.dataset.id;z(m)})}),document.querySelectorAll(".excluir-usuario").forEach(l=>{l.addEventListener("click",async p=>{const m=p.target.dataset.id;if(confirm("Tem certeza que deseja excluir este barbeiro?"))try{const h=localStorage.getItem("token"),b=await fetch(`/api/admin/usuarios/${m}`,{method:"DELETE",headers:{Authorization:`Bearer ${h}`,Accept:"application/json"}});if(!b.ok){const y=await b.json();throw new Error(y.message||"Erro ao excluir barbeiro")}alert("Usuario excluído com sucesso!"),w()}catch(h){console.error(h),alert("Erro ao excluir barbeiro")}})}),(i=document.getElementById("anterior"))==null||i.addEventListener("click",()=>{w(e-1)}),(u=document.getElementById("proximo"))==null||u.addEventListener("click",()=>{w(e+1)})}catch(d){console.error(d),document.getElementById("secao-conteudo").innerHTML='<p class="text-red-500">Erro ao carregar usuarios.</p>'}}function D(){const n=document.getElementById("secao-conteudo"),o=`
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
    `;n.innerHTML=o;const i=document.getElementById("form-cad-usuario");i.addEventListener("submit",async u=>{u.preventDefault();const d=localStorage.getItem("token"),s=new FormData(i),r={};s.forEach((e,t)=>r[t]=e);try{const e=await fetch("/api/admin/usuarios",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`,Accept:"application/json"},body:JSON.stringify(r)});if(!e.ok){const t=await e.json();throw new Error(t.message||"Erro ao cadastrar Usuario")}alert("Usuario cadastrado com Sucesso!"),w()}catch(e){console.error(e)}})}async function z(n){const o=document.getElementById("secao-conteudo"),i=localStorage.getItem("token");try{const u=await fetch(`/api/admin/usuarios/${n}`,{headers:{Authorization:`Bearer ${i}`,Accept:"application/json"}});if(!u.ok)throw new Error("Erro ao buscar barbeiro");const d=await u.json(),s=`
        <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
            <h2 class="text-xl font-bold mb-4">Editar Usuario</h2>

            <form id="form-editar-usuario" class="space-y-4">
                <input type="text" name="nome" value="${d.nome}" class="input w-full border p-2 rounded" required>
                <input type="email" name="email" value="${d.email}" class="input w-full border p-2 rounded" required>
                <input type="tel" name="telefone" value="${d.telefone}" class="input w-full border p-2 rounded" required>
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
        `;o.innerHTML=s;const r=document.getElementById("form-editar-usuario");r.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(r),c={};t.forEach((a,l)=>{a!==""&&(c[l]=a)});try{const a=await fetch(`/api/admin/usuarios/${n}`,{method:"PUT",headers:{Authorization:`Bearer ${i}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(c)});if(!a.ok){const l=await a.json();throw new Error(l.message||"Erro ao atualizar barbeiro")}alert("Usuario atualizado com sucesso!"),w()}catch(a){console.error(a),alert("Erro ao atualizar barbeiro")}})}catch(u){console.error(u),o.innerHTML='<p class="text-red-600">Erro ao carregar barbeiro para edição.</p>'}}async function $(){const n=localStorage.getItem("token");try{const o=await fetch("/api/admin/servicos",{headers:{Authorization:`Bearer ${n}`,Accept:"application/json"}});if(!o.ok)throw new Error("Erro ao buscar servicos");const i=await o.json(),u=`
        <div class="bg-white text-black rounded p-4 shadow-md">
            <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold mb-4">Servicos</h2>
            <button id="cad-usuario" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">Cadastrar Servico</button>
            </div>
            ${i.length>0?`
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
                        ${i.map(s=>`
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
        </div>`;document.getElementById("secao-conteudo").innerHTML=u;const d=document.getElementById("cad-usuario");d&&d.addEventListener("click",()=>q()),document.querySelectorAll(".editar-servico").forEach(s=>{s.addEventListener("click",r=>{const e=r.target.dataset.id;M(e)})}),document.querySelectorAll(".excluir-servico").forEach(s=>{s.addEventListener("click",async r=>{const e=r.target.dataset.id;if(confirm("Tem certeza que deseja excluir este servico?"))try{const c=localStorage.getItem("token"),a=await fetch(`/api/admin/servicos/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${c}`,Accept:"application/json"}});if(!a.ok){const l=await a.json();throw new Error(l.message||"Erro ao excluir servico")}alert("Servico excluído com sucesso!"),$()}catch(c){console.error(c),alert("Erro ao excluir servico")}})})}catch(o){console.error(o),document.getElementById("secao-conteudo").innerHTML='<p class="text-red-500">Erro ao carregar servicos.</p>'}}function q(){const n=document.getElementById("secao-conteudo"),o=`
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
    `;n.innerHTML=o;const i=document.getElementById("form-cad-usuario");i.addEventListener("submit",async u=>{u.preventDefault();const d=localStorage.getItem("token"),s=new FormData(i),r={};s.forEach((e,t)=>r[t]=e);try{const e=await fetch("/api/admin/servicos",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`,Accept:"application/json"},body:JSON.stringify(r)});if(!e.ok){const t=await e.json();throw new Error(t.message||"Erro ao cadastrar Servico")}alert("Servico cadastrado com Sucesso!"),$()}catch(e){console.error(e)}})}async function M(n){const o=document.getElementById("secao-conteudo"),i=localStorage.getItem("token");try{const u=await fetch(`/api/admin/servicos/${n}`,{headers:{Authorization:`Bearer ${i}`,Accept:"application/json"}});if(!u.ok)throw new Error("Erro ao buscar servico");const d=await u.json(),s=`
        <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
            <h2 class="text-xl font-bold mb-4">Editar Servico</h2>

            <form id="form-editar-servico" class="space-y-4">
            <input type="text" name="nome" value="${d.nome}" class="input w-full border p-2 rounded" required>
            <textarea name="descricao" maxlenght="60" class="input w-full border p-2 rounded" required>
            ${d.descricao}
            </textarea>
            <input type="integer" name="preco" value="${d.preco}" class="input w-full border p-2 rounded" required>
            <input type="integer" name="duracao_minutos" value="${d.duracao_minutos}" class="input w-full border p-2 rounded" required>
                <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                    Atualizar
                </button>
            </form>
        </div>
        `;o.innerHTML=s;const r=document.getElementById("form-editar-servico");r.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(r),c={};t.forEach((a,l)=>{a!==""&&(c[l]=a)});try{const a=await fetch(`/api/admin/servicos/${n}`,{method:"PUT",headers:{Authorization:`Bearer ${i}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(c)});if(!a.ok){const l=await a.json();throw new Error(l.message||"Erro ao atualizar servico")}alert("Servico atualizado com sucesso!"),$()}catch(a){console.error(a),alert("Erro ao atualizar servico")}})}catch(u){console.error(u),o.innerHTML='<p class="text-red-600">Erro ao carregar servico para edição.</p>'}}async function x(n=null){const o=localStorage.getItem("token"),i=document.getElementById("secao-conteudo");if(!o||!i)return;const u=new Date().toISOString().split("T")[0],d=n||u;try{const s=await fetch(`/api/admin/barbeiros-agendamentos?data=${d}`,{headers:{Authorization:`Bearer ${o}`,Accept:"application/json"}});if(!s.ok)throw new Error("Erro ao buscar Agendamentos!");const r=await s.json();if(i.innerHTML="",r.length===0){i.innerHTML=`
                <div class="flex items-center justify-between mb-4">
                <p class="text-gray-400">Sem agendamentos nesse dia</p>
                <div class="flex items-center">
                <label for="filtro-data" class="text-white mr-2">Escolher dia:</label>
                <input type="date" id="filtro-data" class="bg-gray-800 text-white rounded p-1">
                </div>
                </div>`;const e=document.getElementById("filtro-data");e&&(e.value=d,e.addEventListener("change",t=>{n=t.target.value,x(n)}));return}r.forEach(e=>{const t=document.createElement("div");t.className="mb-6 bg-gray-900 p-4 rounded",t.innerHTML=`
            <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl mb-2 text-blue-400 font-bold">${e.nome}</h3>
            <div class="flex items-center">
            <label for="filtro-data" class="text-white mr-2">Escolher dia:</label>
            <input type="date" id="filtro-data" class="bg-gray-800 text-white rounded p-1">
            </div>
            </div>
            `,e.agendamentos.length?e.agendamentos.forEach(a=>{var m,g;const l=document.createElement("div");l.className="p-3 mb-2 bg-gray-800 rounded shadow";const p=["pendente","confirmado","cancelado","concluido"].map(h=>`<option value="${h}" ${a.status===h?"selected":""}>${h}</option>`);l.innerHTML=`
                    <p><strong>Cliente:</strong> ${((m=a.cliente)==null?void 0:m.nome)||"N/A"}</p>
                        <p><strong>Serviço:</strong> ${((g=a.servicos)==null?void 0:g.join(", "))||"N/A"}</p>
                        <p><strong>Horário:</strong> ${new Date(a.data_hora).toLocaleString("pt-BR")}</p>
                        <p><strong>Status:</strong> ${a.status}</p>
                        <label class="block mt-2">
                            <span class="text-white font-medium">Status:</span>
                            <select data-id="${a.id_agendamento}" class="select-status bg-gray-700 text-white rounded p-1 mt-1">
                                ${p}
                            </select>
                        </label>
                        <div class="flex gap-2 mt-2">
                        <button class="btn-editar bg-blue-500 text-white px-2 py-1 rounded" data-id="${a.id_agendamento}">Editar</button>
                        <button class="btn-excluir bg-red-500 text-white px-2 py-1 rounded" data-id="${a.id_agendamento}">Excluir</button>
                        </div>
                    `,t.appendChild(l)}):t.innerHTML+=`
                <div class="flex items-center justify-between mb-4">
                <p class="text-gray-400">Sem agendamentos</p>
                <div class="flex items-center">
                <label for="filtro-data" class="text-white mr-2">Escolher dia:</label>
                <input type="date" id="filtro-data" class="bg-gray-800 text-white rounded p-1">
                </div>
                </div>`;const c=t.querySelector("#filtro-data");c&&(c.value=d,c.addEventListener("change",a=>{n=a.target.value,x(n)})),i.appendChild(t)}),document.querySelectorAll(".select-status").forEach(e=>{e.addEventListener("change",async t=>{const c=t.target.dataset.id,a=t.target.value,l=localStorage.getItem("token");try{if(!(await fetch(`/api/admin/agendamentos/${c}`,{method:"PUT",headers:{Authorization:`Bearer ${l}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({status:a})})).ok)throw new Error("Erro ao atualizar status");alert("Status atualizado com sucesso!")}catch(p){console.error(p),alert("Falha ao atualizar status.")}})}),document.querySelectorAll(".btn-excluir").forEach(e=>{e.addEventListener("click",async t=>{const c=t.target.dataset.id;if(confirm("Deseja excluir esse agendamento?"))try{if(!(await fetch(`/api/admin/agendamentos/${c}`,{method:"DELETE",headers:{Authorization:`Bearer ${o}`,Accept:"application/json"}})).ok)throw new Error("Erro ao excluir agendamento");alert("Agendamento excluído com sucesso!"),x(d)}catch(l){console.error(l),alert("Esse agendamento ja foi pago. Não é possivel excluir")}})}),document.querySelectorAll(".btn-editar").forEach(e=>{e.addEventListener("click",async t=>{const c=t.target.dataset.id;try{const a=await fetch(`/api/admin/agendamentos/${c}`,{headers:{Authorization:`Bearer ${o}`,Accept:"application/json"}});if(!a.ok)throw new Error("Erro ao buscar agendamento");const l=await a.json();H(l)}catch(a){console.error(a),alert("Erro ao carregar dados do agendamento.")}})})}catch(s){console.error("Erro ao carregar agendamentos",s),i.innerHTML='<p class="text-red-500">Erro ao carregar agendamentos.</p>'}}async function H(n){const o=localStorage.getItem("token"),i=await fetch("/api/admin/servicos",{headers:{Authorization:`Bearer ${o}`}});if(!i.ok){alert("Erro ao carregar serviços");return}const u=await i.json(),d=n.data_hora.slice(0,16),s=document.getElementById("conteudo-edicao");s.innerHTML=`
        <form id="form-editar-agendamento" class="space-y-4 p-4 bg-white shadow rounded max-w-md mx-auto">
            <h2 class="text-xl font-bold text-center">Editar Agendamento</h2>

            <label class="block">
                <span class="text-black font-semibold">Data e Hora:</span>
                <input type="datetime-local" id="editar-data-hora" class="w-full mt-1 p-2 border rounded"
                    value="${d}" required>
            </label>

            <div>
                <span class="text-black font-semibold">Serviços:</span>
                <div id="editar-servicos-checkbox" class="mt-1 space-y-1">
                    ${u.map(e=>{var t;return`
                        <label class="block text-black">
                            <input type="checkbox" name="servicos" value="${e.id_servico}" class="mr-2"
                                ${(t=n.servicos)!=null&&t.some(c=>c.id_servico===e.id_servico)?"checked":""}>
                            ${e.nome} - ${e.duracao_minutos} min
                        </label>
                    `}).join("")}
                </div>
            </div>

            <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700">
                Salvar Alterações
            </button>
        </form>
    `,document.getElementById("form-editar-agendamento").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("editar-data-hora").value,c=Array.from(document.querySelectorAll('input[name="servicos"]:checked')).map(a=>a.value);try{const a=await fetch(`/api/admin/agendamentos/${n.id_agendamento}`,{method:"PUT",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({data_hora:t,servicos:c})});if(!a.ok){const l=await a.json();throw new Error(l.message||"Erro ao editar agendamento")}alert("Agendamento atualizado com sucesso!"),s.innerHTML=""}catch(a){console.error(a),alert("Erro ao salvar alterações")}})}async function k(){const n=localStorage.getItem("token");try{const o=await fetch("/api/admin/pagamentos",{headers:{Authorization:`Bearer ${n}`,Accept:"application/json"}});if(!o.ok)throw new Error("Erro ao buscar pagamentos");const i=await o.json(),u=`
        <div class="bg-white text-black rounded p-4 shadow-md">
            <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold mb-4">Pagamentos</h2>
            <button id="cad-usuario" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">Cadastrar Pagamento</button>
            </div>

            <div class="flex items-center gap-4 mb-4">
                <label>
                    Data Inicio:
                    <input type="date" id="filtro-data" class="border p-2 rounded" value="${new Date().toISOString().split("T")[0]}">
                </label>
                <label>
                    Data Final(Opcional):
                    <input type="date" id="filtro-data-fim" class="border p-2 rounded" value="">
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
        <div id="tabela-pagamentos"></div>`;document.getElementById("secao-conteudo").innerHTML=u;const d=document.getElementById("cad-usuario");d&&d.addEventListener("click",()=>P());const s=async()=>{const t=new Date,c=new Date(t),a=new Date(t),p=(t.getDay()+1)%7;c.setDate(t.getDate()-p),a.setDate(c.getDate()+6);const m=c.toISOString().split("T")[0],g=a.toISOString().split("T")[0];try{const h=await fetch(`/api/admin/pagamentos?data_inicio=${m}&data_fim=${g}&group=true`,{headers:{Authorization:`Bearer ${n}`,Accept:"application/json"}});if(!h.ok)throw new Error("Erro ao buscar pagamentos da semana");const b=await h.json(),y=document.getElementById("tabela-pagamentos");y.innerHTML=`
                <div>
                <h3 class="font-bold text-lg mb-2">Semana: ${B(m)} - ${B(g)}</h3>
                </div>
                `,console.log(b),y.innerHTML+=b.map(v=>`
            <div class="border p-4 rounded mb-4 shadow">
                <h3 class="font-bold text-lg mb-2">${v.barbeiro||"Sem nome"}</h3>
                <p>Total: R$ ${parseFloat(v.total).toFixed(2)}</p>
                <ul class="mt-2 text-sm text-gray-600">
                    ${v.pagamentos.map(f=>`<li>${f.data} - R$ ${f.total}</li>`).join("")}
                </ul>
            </div>
        `).join("")}catch(h){console.error(h),alert("Erro ao buscar pagamentos da semana")}};document.getElementById("aplicar-filtro").addEventListener("click",A),await A(),document.getElementById("filtro-semana").addEventListener("click",s)}catch(o){console.error(o),document.getElementById("secao-conteudo").innerHTML='<p class="text-red-500">Erro ao carregar pagamentos.</p>'}}async function P(){const n=document.getElementById("secao-conteudo"),u=`
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
    `;n.innerHTML=u;const d=document.getElementById("select-agendamento"),s=localStorage.getItem("token"),e=await(await fetch("/api/admin/agendamentos-concluidos",{headers:{Authorization:`Bearer ${s}`}})).json(),c=await(await fetch("/api/admin/pagamentos",{headers:{Authorization:`Bearer ${s}`}})).json(),a=new Set(c.map(m=>m.id_agendamento)),l=e.filter(m=>!a.has(m.id_agendamento));d.innerHTML+=l.map(m=>`
        <option value="${m.id_agendamento}">
            ${m.cliente.nome} - ${new Date(m.data_hora).toLocaleString("pt-BR")}
        </option>
    `).join("");const p=document.getElementById("form-cad-pagamento");p.addEventListener("submit",async m=>{m.preventDefault();const g=localStorage.getItem("token"),h=new FormData(p),b={};h.forEach((f,S)=>b[S]=f),b.data_pagamento&&(b.data_pagamento=F(b.data_pagamento));const y=e.find(f=>f.id_agendamento==b.id_agendamento);if(!y){alert("Agendamento inválido");return}const v={id_agendamento:b.id_agendamento,id_cliente:y.id_cliente||"N|A",valor:b.valor,forma_pagamento:b.forma_pagamento,data_pagamento:b.data_pagamento};try{const f=await fetch("/api/admin/pagamentos",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`,Accept:"application/json"},body:JSON.stringify(v)});if(!f.ok){const S=await f.json();throw new Error(S.message||"Erro ao cadastrar Pagamento")}alert("Pagamento cadastrado com sucesso!"),k()}catch(f){console.error(f)}})}async function A(){const n=document.getElementById("filtro-data").value,o=document.getElementById("filtro-data-fim").value,i=document.getElementById("group-barbeiro").checked,u=localStorage.getItem("token");if(!n){alert("Preencha pelo menos a data Inicial");return}let d=`data_pagamento=${n}`;o&&(d=`data_inicio=${n}&data_fim=${o}`);try{const s=await fetch(`/api/admin/pagamentos?${d}&group=${i}`,{headers:{Authorization:`Bearer ${u}`}});if(!s.ok)throw new Error("Erro na requisição");const r=await s.json(),e=document.getElementById("tabela-pagamentos");i?e.innerHTML=r.map(t=>`
                <div class="border p-4 rounded mb-4 shadow">
                <h3 class="font-bold text-lg mb-2">${t.barbeiro||"Sem nome"}</h3>
                <p>Total: R$ ${t.total.toFixed(2)}</p>
                <ul class="mt-2 text-sm text-gray-600">
                    ${t.pagamentos.map(c=>`<li>${c.data} - R$ ${c.total}</li>`).join("")}
                </ul>
            </div>
                `).join(""):e.innerHTML=`
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
                    ${r.map(t=>{var c;return`
                        <tr>
                            <td class="p-2 border">${((c=t.cliente)==null?void 0:c.nome)||"Desconhecido"}</td>
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
        `,document.querySelectorAll(".editar-pagamento").forEach(t=>{t.addEventListener("click",c=>{const a=c.target.dataset.id;C(a)})}),document.querySelectorAll(".excluir-pagamento").forEach(t=>{t.addEventListener("click",async c=>{const a=c.target.dataset.id;if(confirm("Tem certeza que deseja excluir este pagamento?"))try{const p=localStorage.getItem("token"),m=await fetch(`/api/admin/pagamentos/${a}`,{method:"DELETE",headers:{Authorization:`Bearer ${p}`,Accept:"application/json"}});if(!m.ok){const g=await m.json();throw new Error(g.message||"Erro ao excluir pagamento")}alert("Pagamento excluído com sucesso!"),k()}catch(p){console.error(p),alert("Erro ao excluir pagamento")}})})}catch{}}async function C(n){var u,d;const o=document.getElementById("secao-conteudo"),i=localStorage.getItem("token");try{const s=await fetch(`/api/admin/pagamentos/${n}`,{headers:{Authorization:`Bearer ${i}`,Accept:"application/json"}});if(!s.ok)throw new Error("Erro ao buscar pagamento");const r=await s.json(),e=new Date(r.data_pagamento).toISOString().slice(0,16),t=`
        <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
            <h2 class="text-xl font-bold mb-4">Editar Pagamento</h2>

            <form id="form-editar-pagamento" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Agendamento</label>
                    <input
                        type="text"
                        value="${((u=r.cliente)==null?void 0:u.nome)||"Desconhecido"} - ${new Date(((d=r.agendamento)==null?void 0:d.data_hora)||r.data_pagamento).toLocaleString("pt-BR")}"
                        class="input w-full border p-2 rounded bg-gray-100 text-gray-500"
                        disabled
                    >
                </div>

                <input
                    type="number"
                    step="0.01"
                    name="valor"
                    value="${r.valor}"
                    class="input w-full border p-2 rounded"
                    placeholder="Valor (R$)"
                    required
                >

                <select name="forma_pagamento" class="input w-full border p-2 rounded" required>
                    <option value="">Forma de Pagamento</option>
                    <option value="pix" ${r.forma_pagamento==="pix"?"selected":""}>PIX</option>
                    <option value="cartão" ${r.forma_pagamento==="cartão"?"selected":""}>Cartão</option>
                    <option value="dinheiro" ${r.forma_pagamento==="dinheiro"?"selected":""}>Dinheiro</option>
                </select>

                <label class="block font-medium mt-4 mb-1">Data do Pagamento</label>
                <input
                    type="datetime-local"
                    name="data_pagamento"
                    value="${e}"
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
        `;o.innerHTML=t;const c=document.getElementById("form-editar-pagamento");c.addEventListener("submit",async a=>{a.preventDefault();const l=new FormData(c),p={};l.forEach((m,g)=>{m!==""&&(p[g]=m)});try{p.data_pagamento&&(p.data_pagamento=N(p.data_pagamento));const m=await fetch(`/api/admin/pagamentos/${n}`,{method:"PUT",headers:{Authorization:`Bearer ${i}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(p)});if(!m.ok){const g=await m.json();throw new Error(g.message||"Erro ao atualizar pagamento")}alert("Pagamento atualizado com sucesso!"),k()}catch(m){console.error(m),alert("Erro ao atualizar pagamento")}})}catch(s){console.error(s),o.innerHTML='<p class="text-red-600">Erro ao carregar pagamento para edição.</p>'}}function N(n){const o=new Date(n),i=c=>c.toString().padStart(2,"0"),u=o.getFullYear(),d=i(o.getMonth()+1),s=i(o.getDate()),r=i(o.getHours()),e=i(o.getMinutes()),t=i(o.getSeconds());return`${u}-${d}-${s} ${r}:${e}:${t}`}function F(n){return n.length===19?n.replace("T"," "):n.replace("T"," ")+":00"}function B(n){const[o,i,u]=n.split("-");return`${u}/${i}/${o}`}document.addEventListener("DOMContentLoaded",()=>{j(),T(),window.renderSecao=function(n){const o=document.getElementById("secao-conteudo");if(o)switch(o.innerHTML="",n){case"Usuarios":w(o);break;case"Barbeiros":E();break;case"Serviços":$();break;case"Agendas":x(o);break;case"Pagamentos":k();break;default:o.innerHTML=`<p>Seção "${n}" não encontrada.</p>`}},window.renderSecao("Barbeiros"),L("admin")});
