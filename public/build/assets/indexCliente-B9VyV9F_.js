import{v as B,g as M}from"./inatividade-DwR18d54.js";import{I as j}from"./index-BOAzHGzj.js";async function I(e){const t=localStorage.getItem("token"),n=document.getElementById("botoes-barbeiros");n.innerHTML="";try{const i=await(await fetch("/api/cliente/barbeiros",{headers:{Authorization:`Bearer ${t}`}})).json(),c=document.createElement("div");c.className="bg-gray-50 p-6 rounded-2xl shadow-lg mb-4";const b=document.createElement("h2");b.textContent="Escolher agenda",b.className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2";const l=document.createElement("div");l.className="flex flex-wrap gap-2",i.forEach(f=>{const a=document.createElement("button"),u=f.telefone;a.textContent=`${f.nome} - ${_(u)}`,a.className="botao-barbeiro bg-gray-700 text-white p-2 rounded hover:bg-gray-600",a.addEventListener("click",()=>{window.barbeiroSelecionado=f.id_usuario,e&&e(f.id_usuario)}),l.appendChild(a)}),c.appendChild(b),c.appendChild(l),n.appendChild(c)}catch(r){console.error("Erro ao carregar barbeiros:",r),n.innerHTML='<p class="text-red-500">Erro ao carregar barbeiros.</p>'}}async function k(e,t){const n=localStorage.getItem("token"),r=document.getElementById("secao-conteudo");r.innerHTML="",r.innerHTML=`
    <div class="flex items-center justify-center h-40">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-800"></div>
    </div>
        `;try{const c=await(await fetch(`/api/cliente/barbeiros/${e}/agenda?data=${t}`,{headers:{Authorization:`Bearer ${n}`}})).json(),b=T("09:00","21:00"),l=await D(),f=b.map(g=>{var h;const p=`${t}T${g}:00`,o=new Date(p),s=c.find(d=>{const w=new Date(d.data_hora),v=d.servicos.reduce((x,$)=>x+$.duracao_minutos,0),y=new Date(w.getTime()+v*6e4);return o>=w&&o<y});if(s){const d=((h=s.cliente)==null?void 0:h.id_usuario)===(l==null?void 0:l.id_usuario),w=s.servicos.reduce((E,L)=>E+L.duracao_minutos,0),v=new Date(s.data_hora),y=new Date(v.getTime()+w*6e4),x=d?s.status==="pendente"?"bg-yellow-500":"bg-green-600":"bg-gray-500",$=d?"Seu Agendamento":"Ocupado",A=s.servicos.map(E=>E.nome).join(" - ");return`
                    <div class="w-full p-3 rounded-2xl mb-2 text-white ${x} shadow flex flex-col gap-1">
                    <div class="flex items-center justify-between">
                    <span class="text-sm font-semibold">${$} - ${s.status}</span>
                    <span class="text-xs text-white/80">${g} - ${H(y)}</span>
                    </div>
                    <div class="text-sm text-white/90 italic">
                    ${A}
                    </div>
                    </div>
                    `}return`
                <div class="w-full p-3 rounded-2xl mb-2 bg-gray-100 text-gray-700 shadow-sm flex items-center justify-between hover:bg-gray-200 transition">
                    <span class="text-sm font-medium">${g}</span>
                    <span class="text-xs text-gray-500 italic">Disponível</span>
                </div>
            `}),a=new Date(t);a.setDate(a.getDate()+1);const m=`
            <div class="bg-white/90 p-6 rounded-2xl shadow-lg">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Agenda - ${a.toLocaleDateString("pt-BR")}</h2>
            <div class="flex flex-col gap-2">
            ${f.join("")}
            </div>
            </div>
            `;r.innerHTML=m}catch(i){console.error("Erro ao renderizar agenda:",i),r.innerHTML='<p class="text-red-500">Erro ao carregar agenda.</p>'}}function T(e,t){const n=[];let[r,i]=e.split(":").map(Number);const[c,b]=t.split(":").map(Number);for(;r<c||r===c&&i<b;)n.push(`${r.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`),i+=30,i>=60&&(i=0,r++);return n}function H(e){return`${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}`}async function D(){const e=localStorage.getItem("token");if(!e)return null;try{const t=await fetch("/api/me",{headers:{Authorization:`Bearer ${e}`,Accept:"application/json"}});if(!t.ok)throw new Error("Usuário não encontrado");return await t.json()}catch(t){return console.error("Erro ao obter perfil do cliente:",t),null}}async function S(e=!0,t=1){var i;const n=localStorage.getItem("token"),r=document.getElementById("secao-conteudo");r.innerHTML=`
        <div class="flex items-center justify-center h-40">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-800"></div>
        </div>
    `;try{const c=`${e?"?ultimos_7_dias=1":""}${e?"&":"?"}page=${t}`;let l=await(await fetch(`/api/cliente/me/agendamentos${c}`,{headers:{Authorization:`Bearer ${n}`}})).json();const a=l.data.map(o=>{var d;const s=new Date(o.data_hora),h=o.servicos.map(w=>w.nome).join(", ");return`
                <div class="p-4 rounded-xl shadow bg-white mb-2 border-l-4 ${o.status==="pendente"?"border-yellow-500":"border-green-600"}">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-lg font-semibold text-gray-800">${((d=o.barbeiro)==null?void 0:d.nome)||"N/A"}</p>
                            <p class="font-semibold text-black">${s.toLocaleDateString()} - ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</p>
                            <p class="text-sm text-gray-600 italic">${h}</p>
                        </div>
                        <span class="text-sm font-medium ${o.status==="pendente"?"text-yellow-600":"text-green-600"}">${o.status}</span>
                    </div>
                </div>
            `}),u=l.last_page,m=l.current_page;let g="";for(let o=1;o<=u;o++)g+=`
        <button class="px-3 py-1 rounded
            ${o===m?"bg-blue-600 text-white":"bg-gray-200 hover:bg-gray-300"}"
            data-page="${o}">
            ${o}
        </button>
    `;const p=`
    <div class="flex justify-center mt-4 gap-2 flex-wrap text-black">
        ${m>1?`<button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" data-page="${m-1}">Anterior</button>`:""}
        ${g}
        ${m<u?`<button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" data-page="${m+1}">Próximo</button>`:""}
    </div>
`;r.innerHTML=`
            <div class="bg-white/90 p-6 rounded-2xl shadow-lg">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">Meus Agendamentos</h2>
                    <button id="alternar-filtro" class="text-sm text-blue-600 hover:underline">
                        ${e?"Ver todos":"Ver últimos 7 dias"}
                    </button>
                </div>
                <div class="flex flex-col gap-2">
                    ${a.length?a.join(""):'<p class="text-gray-500 text-sm">Nenhum agendamento encontrado.</p>'}
                </div>
                ${p}
            </div>
        `,document.querySelectorAll("[data-page]").forEach(o=>{o.addEventListener("click",()=>{const s=o.getAttribute("data-page");S(e,s)})}),(i=document.getElementById("alternar-filtro"))==null||i.addEventListener("click",()=>{S(!e)})}catch(c){console.error("Erro ao renderizar agendamentos:",c),r.innerHTML='<p class="text-red-500">Erro ao carregar agendamentos.</p>'}}function _(e){const t=j.createMask({mask:["(00) 0000-0000","(00) 00000-0000"]});return t.resolve(e),t.value}async function C(){const e=localStorage.getItem("token"),t=document.getElementById("agendar-corte"),n=document.getElementById("modal-agendamento"),r=document.getElementById("fechar-modal"),i=document.getElementById("nome-cliente"),c=document.getElementById("select-barbeiro"),b=document.getElementById("data-hora"),l=document.getElementById("form-agendar");function f(){const a=new Date,u=a.getFullYear(),m=String(a.getMonth()+1).padStart(2,"0"),g=String(a.getDate()).padStart(2,"0"),p=String(a.getHours()).padStart(2,"0"),o=String(a.getMinutes()).padStart(2,"0");return`${u}-${m}-${g}T${p}:${o}`}!t||!n||(t.addEventListener("click",async()=>{const a=document.getElementById("carregando-formulario");a.classList.remove("hidden");try{const u=await fetch("/api/me",{headers:{Authorization:`Bearer ${e}`}});if(!u.ok)throw new Error("Erro ao buscar perfil");const m=await u.json();i.value=m.nome;const g=await fetch("/api/cliente/barbeiros",{headers:{Authorization:`Bearer ${e}`}});if(!g.ok)throw new Error("Erro ao buscar barbeiros");const p=await g.json();c.innerHTML=p.map(d=>`<option value="${d.id_usuario}">${d.nome}</option>`).join("");const o=await fetch("/api/cliente/servicos",{headers:{Authorization:`Bearer ${e}`}});if(!o.ok)throw new Error("Erro ao buscar serviços");const s=await o.json(),h=document.getElementById("servicos-checkbox");h.innerHTML=s.map(d=>`<label class="block text-black">
                    <input type="checkbox" name="servicos" value="${d.id_servico}" class="mr-2">
                    ${d.nome} - ${d.duracao_minutos} minutos
                </label>`).join(""),b.min=f(),n.classList.remove("hidden")}catch(u){console.error("Erro ao carregar formulário:",u),alert("Erro ao carregar formulário!")}finally{a.classList.add("hidden")}}),r.addEventListener("click",()=>{n.classList.add("hidden")}),l.addEventListener("submit",async a=>{a.preventDefault();const u=c.value,m=b.value,g=Array.from(document.querySelectorAll('input[name="servicos"]:checked')).map(p=>p.value);if(g.length===0){alert("Por favor, selecione pelo menos um serviço.");return}try{const p=new Date(m).getHours();if(p<9||p>20){alert("Por favor, selecione um horário entre 09:00 e 20:00");return}const o=await fetch("/api/cliente/agendamentos",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({id_barbeiro:u,data_hora:m,servicos:g,nome:i.value})});if(!o.ok){const s=await o.json();if(o.status===409&&s.message==="O barbeiro já possui um agendamento neste horário."){alert("Erro: horário já reservado. Por favor, escolha outro horário.");return}else throw new Error(s.message||"Erro ao agendar")}alert("Agendamento realizado com sucesso!"),n.classList.add("hidden"),l.reset()}catch(p){console.error("Erro ao agendar:",p),alert("Erro ao agendar!")}}))}document.addEventListener("DOMContentLoaded",async()=>{B(),document.addEventListener("dia-selected",e=>{const t=e.detail.toISOString().split("T")[0];window.dataSelecionada=t,window.barbeiroSelecionado&&typeof window.renderSecao=="function"&&window.renderSecao("Agendas")}),M(),await I(e=>{window.barbeiroSelecionado=e;const t=window.dataSelecionada||new Date().toISOString().split("T")[0];k(e,t)}),window.renderSecao=function(e){const t=document.getElementById("secao-conteudo");if(t)switch(t.innerHTML="",e){case"Meus Agendamentos":S();break;case"Agendas":const n=window.barbeiroSelecionado,r=window.dataSelecionada||new Date().toISOString().split("T")[0];n&&r?k(n,r):t.innerHTML="<p>Barbeiro ou data não selecionados.</p>";break;default:t.innerHTML=`<p>Seção "${e}" não encontrada.</p>`}},window.renderSecao("Meus Agendamentos"),C()});
