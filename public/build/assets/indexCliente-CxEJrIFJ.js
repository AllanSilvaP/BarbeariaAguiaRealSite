import{v as L,g as I}from"./inatividade-DwR18d54.js";import{I as M}from"./index-BOAzHGzj.js";async function j(e){const t=localStorage.getItem("token"),r=document.getElementById("botoes-barbeiros");r.innerHTML="";try{const s=await(await fetch("/api/cliente/barbeiros",{headers:{Authorization:`Bearer ${t}`}})).json(),i=document.createElement("div");i.className="bg-gray-50 p-6 rounded-2xl shadow-lg mb-4";const p=document.createElement("h2");p.textContent="Escolher agenda",p.className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2";const l=document.createElement("div");l.className="flex flex-wrap gap-2",s.forEach(g=>{const n=document.createElement("button"),b=g.telefone;n.textContent=`${g.nome} - ${D(b)}`,n.className="botao-barbeiro bg-gray-700 text-white p-2 rounded hover:bg-gray-600",n.addEventListener("click",()=>{window.barbeiroSelecionado=g.id_usuario,e&&e(g.id_usuario)}),l.appendChild(n)}),i.appendChild(p),i.appendChild(l),r.appendChild(i)}catch(a){console.error("Erro ao carregar barbeiros:",a),r.innerHTML='<p class="text-red-500">Erro ao carregar barbeiros.</p>'}}async function k(e,t){const r=localStorage.getItem("token"),a=document.getElementById("secao-conteudo");a.innerHTML="",a.innerHTML=`
    <div class="flex items-center justify-center h-40">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-800"></div>
    </div>
        `;try{const i=await(await fetch(`/api/cliente/barbeiros/${e}/agenda?data=${t}`,{headers:{Authorization:`Bearer ${r}`}})).json(),p=T("09:00","21:00"),l=await _(),g=p.map(c=>{var h;const f=`${t}T${c}:00`,o=new Date(f),u=i.find(d=>{const w=new Date(d.data_hora),v=d.servicos.reduce((x,$)=>x+$.duracao_minutos,0),y=new Date(w.getTime()+v*6e4);return o>=w&&o<y});if(u){const d=((h=u.cliente)==null?void 0:h.id_usuario)===(l==null?void 0:l.id_usuario),w=u.servicos.reduce((E,B)=>E+B.duracao_minutos,0),v=new Date(u.data_hora),y=new Date(v.getTime()+w*6e4),x=d?u.status==="pendente"?"bg-yellow-500":"bg-green-600":"bg-gray-500",$=d?"Seu Agendamento":"Ocupado",A=u.servicos.map(E=>E.nome).join(" - ");return`
                    <div class="w-full p-3 rounded-2xl mb-2 text-white ${x} shadow flex flex-col gap-1">
                    <div class="flex items-center justify-between">
                    <span class="text-sm font-semibold">${$} - ${u.status}</span>
                    <span class="text-xs text-white/80">${c} - ${H(y)}</span>
                    </div>
                    <div class="text-sm text-white/90 italic">
                    ${A}
                    </div>
                    </div>
                    `}return`
                <div class="w-full p-3 rounded-2xl mb-2 bg-gray-100 text-gray-700 shadow-sm flex items-center justify-between hover:bg-gray-200 transition">
                    <span class="text-sm font-medium">${c}</span>
                    <span class="text-xs text-gray-500 italic">Disponível</span>
                </div>
            `}),n=new Date(t);n.setDate(n.getDate()+1);const m=`
            <div class="bg-white/90 p-6 rounded-2xl shadow-lg">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Agenda - ${n.toLocaleDateString("pt-BR")}</h2>
            <div class="flex flex-col gap-2">
            ${g.join("")}
            </div>
            </div>
            `;a.innerHTML=m}catch(s){console.error("Erro ao renderizar agenda:",s),a.innerHTML='<p class="text-red-500">Erro ao carregar agenda.</p>'}}function T(e,t){const r=[];let[a,s]=e.split(":").map(Number);const[i,p]=t.split(":").map(Number);for(;a<i||a===i&&s<p;)r.push(`${a.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`),s+=30,s>=60&&(s=0,a++);return r}function H(e){return`${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}`}async function _(){const e=localStorage.getItem("token");if(!e)return null;try{const t=await fetch("/api/me",{headers:{Authorization:`Bearer ${e}`,Accept:"application/json"}});if(!t.ok)throw new Error("Usuário não encontrado");return await t.json()}catch(t){return console.error("Erro ao obter perfil do cliente:",t),null}}async function S(e=!0,t=1){var s;const r=localStorage.getItem("token"),a=document.getElementById("secao-conteudo");a.innerHTML=`
        <div class="flex items-center justify-center h-40">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-800"></div>
        </div>
    `;try{const i=`${e?"?ultimos_7_dias=1":""}${e?"&":"?"}page=${t}`;let l=await(await fetch(`/api/cliente/me/agendamentos${i}`,{headers:{Authorization:`Bearer ${r}`}})).json();const n=l.data.map(o=>{var d;const u=new Date(o.data_hora),h=o.servicos.map(w=>w.nome).join(", ");return`
                <div class="p-4 rounded-xl shadow bg-white mb-2 border-l-4 ${o.status==="pendente"?"border-yellow-500":"border-green-600"}">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-lg font-semibold text-gray-800">${((d=o.barbeiro)==null?void 0:d.nome)||"N/A"}</p>
                            <p class="font-semibold text-black">${u.toLocaleDateString()} - ${u.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</p>
                            <p class="text-sm text-gray-600 italic">${h}</p>
                        </div>
                        <span class="text-sm font-medium ${o.status==="pendente"?"text-yellow-600":"text-green-600"}">${o.status}</span>
                    </div>
                </div>
            `}),b=l.last_page,m=l.current_page;let c="";for(let o=1;o<=b;o++)c+=`
        <button class="px-3 py-1 rounded
            ${o===m?"bg-blue-600 text-white":"bg-gray-200 hover:bg-gray-300"}"
            data-page="${o}">
            ${o}
        </button>
    `;const f=`
    <div class="flex justify-center mt-4 gap-2 flex-wrap text-black">
        ${m>1?`<button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" data-page="${m-1}">Anterior</button>`:""}
        ${c}
        ${m<b?`<button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" data-page="${m+1}">Próximo</button>`:""}
    </div>
`;a.innerHTML=`
            <div class="bg-white/90 p-6 rounded-2xl shadow-lg">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">Meus Agendamentos</h2>
                    <button id="alternar-filtro" class="text-sm text-blue-600 hover:underline">
                        ${e?"Ver todos":"Ver últimos 7 dias"}
                    </button>
                </div>
                <div class="flex flex-col gap-2">
                    ${n.length?n.join(""):'<p class="text-gray-500 text-sm">Nenhum agendamento encontrado.</p>'}
                </div>
                ${f}
            </div>
        `,document.querySelectorAll("[data-page]").forEach(o=>{o.addEventListener("click",()=>{const u=o.getAttribute("data-page");S(e,u)})}),(s=document.getElementById("alternar-filtro"))==null||s.addEventListener("click",()=>{S(!e)})}catch(i){console.error("Erro ao renderizar agendamentos:",i),a.innerHTML='<p class="text-red-500">Erro ao carregar agendamentos.</p>'}}function D(e){const t=M.createMask({mask:["(00) 0000-0000","(00) 00000-0000"]});return t.resolve(e),t.value}async function C(){const e=localStorage.getItem("token"),t=document.getElementById("agendar-corte"),r=document.getElementById("modal-agendamento"),a=document.getElementById("fechar-modal"),s=document.getElementById("nome-cliente"),i=document.getElementById("select-barbeiro"),p=document.getElementById("data-hora"),l=document.getElementById("form-agendar");!t||!r||(t.addEventListener("click",async()=>{const g=document.getElementById("carregando-formulario");g.classList.remove("hidden");try{const n=await fetch("/api/me",{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)throw new Error("Erro ao buscar perfil");const b=await n.json();s.value=b.nome;const m=await fetch("/api/cliente/barbeiros",{headers:{Authorization:`Bearer ${e}`}});if(!m.ok)throw new Error("Erro ao buscar barbeiros");const c=await m.json();i.innerHTML=c.map(d=>`<option value="${d.id_usuario}">${d.nome}</option>`).join("");const f=await fetch("/api/cliente/servicos",{headers:{Authorization:`Bearer ${e}`}});if(!f.ok)throw new Error("Erro ao buscar serviços");const o=await f.json(),u=document.getElementById("servicos-checkbox");u.innerHTML=o.map(d=>`<label class="block text-black">
                    <input type="checkbox" name="servicos" value="${d.id_servico}" class="mr-2">
                    ${d.nome} - ${d.duracao_minutos} minutos
                </label>`).join("");const h=new Date;p.min=h.toISOString().slice(0,16),r.classList.remove("hidden")}catch(n){console.error("Erro ao carregar formulário:",n),alert("Erro ao carregar formulário!")}finally{g.classList.add("hidden")}}),a.addEventListener("click",()=>{r.classList.add("hidden")}),l.addEventListener("submit",async g=>{g.preventDefault();const n=i.value,b=p.value,m=Array.from(document.querySelectorAll('input[name="servicos"]:checked')).map(c=>c.value);if(m.length===0){alert("Por favor, selecione pelo menos um serviço.");return}try{const c=new Date(b).getHours();if(c<9||c>20){alert("Por favor, selecione um horário entre 09:00 e 20:00");return}const f=await fetch("/api/cliente/agendamentos",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({id_barbeiro:n,data_hora:b,servicos:m,nome:s.value})});if(!f.ok){const o=await f.json();if(f.status===409&&o.message==="O barbeiro já possui um agendamento neste horário."){alert("Erro: horário já reservado. Por favor, escolha outro horário.");return}else throw new Error(o.message||"Erro ao agendar")}alert("Agendamento realizado com sucesso!"),r.classList.add("hidden"),l.reset()}catch(c){console.error("Erro ao agendar:",c),alert("Erro ao agendar!")}}))}document.addEventListener("DOMContentLoaded",async()=>{L(),document.addEventListener("dia-selected",e=>{const t=e.detail.toISOString().split("T")[0];window.dataSelecionada=t,window.barbeiroSelecionado&&typeof window.renderSecao=="function"&&window.renderSecao("Agendas")}),I(),await j(e=>{window.barbeiroSelecionado=e;const t=window.dataSelecionada||new Date().toISOString().split("T")[0];k(e,t)}),window.renderSecao=function(e){const t=document.getElementById("secao-conteudo");if(t)switch(t.innerHTML="",e){case"Meus Agendamentos":S();break;case"Agendas":const r=window.barbeiroSelecionado,a=window.dataSelecionada||new Date().toISOString().split("T")[0];r&&a?k(r,a):t.innerHTML="<p>Barbeiro ou data não selecionados.</p>";break;default:t.innerHTML=`<p>Seção "${e}" não encontrada.</p>`}},window.renderSecao("Meus Agendamentos"),C()});
