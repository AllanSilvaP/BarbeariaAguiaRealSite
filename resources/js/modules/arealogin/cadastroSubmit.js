export async function handleCadastroSubmit(form) {
    const cliente = 'cliente';

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email-cad').value;
        const senha = document.getElementById('senha-cad').value;

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ nome, telefone, email, senha, tipo_usuario: cliente })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.erro || 'Credenciais inválidas');
                return;
            }

            alert('Conta cadastrada com sucesso!');

            // Esconde o formulário de cadastro
            document.getElementById('cad-form')?.classList.add('hidden');

            // Mostra o formulário de login
            document.getElementById('login-form')?.classList.remove('hidden');

        } catch (err) {
            console.error(err);
            alert('Erro no cadastro. Verifique novamente!');
        }
    });
}
