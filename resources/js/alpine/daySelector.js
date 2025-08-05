import Alpine from 'alpinejs'

Alpine.data('daySelector', () => ({
  days: Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)

    return {
      date,
      iso: date.toISOString().split('T')[0],
      dia: String(date.getDate()).padStart(2, '0'),
      semana: date.toLocaleDateString('pt-BR', { weekday: 'long' }).replace(/^./, m => m.toUpperCase())
    }
  }),

  visible: 3,
  start: 0,
  selected: 0,

  move(direction) {
    if (direction === 'left') {
      this.start = Math.max(this.start - 1, 0)
    } else if (direction === 'right') {
      this.start = Math.min(this.start + 1, this.days.length - this.visible)
    }
  },

  select(index) {
    this.selected = index
    const selectedDate = this.days[index].date

    // Dispara evento (caso alguém esteja escutando)
    this.$dispatch('dia-selected', selectedDate)

    // Atualiza a agenda automaticamente
    if (window.barbeiroSelecionado && typeof window.renderSecao === 'function') {
      window.renderSecao('Agendas')
    }
  }
}))
