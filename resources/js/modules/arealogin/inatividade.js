const MAX_INATIVIDADE = 2 * 60 * 60 * 1000

export function verificarInatividade() {
    const TOKEN_KEY = 'token';
    const LAST_ACTIVITY_KEY = 'lastActivity';

    function updateInatividade() {
        localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
    }

    function verificaInatividade() {
        const token = localStorage.getItem(TOKEN_KEY);
        const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY)

        if (token && lastActivity) {
            const diferenca = Date.now() - parseInt(lastActivity, 10);
            if (diferenca > MAX_INATIVIDADE) {
                localStorage.removeItem(TOKEN_KEY)
                localStorage.removeItem(LAST_ACTIVITY_KEY);
                alert('Sua sessão expirou por inatividade');
                window.location.href = '/login';
            }
        }
    }

    ['click', 'mousemove', 'keydown'].forEach(event => {
        window.addEventListener(event, updateInatividade)

        setInterval(verificaInatividade, 60 * 1000)

        if (localStorage.getItem(TOKEN_KEY)) {
            updateInatividade();
        }
    })
}
