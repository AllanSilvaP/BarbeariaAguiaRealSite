import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js','resources/js/index.js', 'resources/js/internal/indexHub.js', 'resources/js/internal/indexBarbeiro.js', 'resources/js/internal/indexCliente.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
