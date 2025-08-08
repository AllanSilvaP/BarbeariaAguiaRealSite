<div x-data="daySelector()" class="flex items-center justify-center space-x-4 py-4">
    <button x-on:click="move('left')" :disabled="start===0"
        class="text-white hover:text-gray-400 disabled:opacity-50">←</button>

    <template x-for="(d, i) in days.slice(start, start+visible)" :key="i">
        <div
            x-on:click="select(start + i)"
            :class="start+i===selected
        ? 'bg-white text-black scale-110 font-bold shadow-lg'
        : 'bg-black text-white opacity-70'"
            class="flex flex-col items-center justify-center cursor-pointer rounded-xl px-2 py-4 text-center transition-all duration-300 w-24 h-24 flex-shrink-0 overflow-hidden">
            <span x-text="d.dia" class="text-2xl"></span>
            <span x-text="d.semana" class="text-sm uppercase leading-tight"></span>
        </div>
    </template>

    <button x-on:click="move('right')" :disabled="start+visible>=days.length"
        class="text-white hover:text-gray-400 disabled:opacity-50">→</button>
</div>
