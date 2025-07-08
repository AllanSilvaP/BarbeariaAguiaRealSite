import Alpine from 'alpinejs'

Alpine.data('daySelector', () => ({
  days: Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const dia = String(d.getDate()).padStart(2,'0')
    const semana = d
      .toLocaleDateString('pt-BR', { weekday:'long' })
      .replace(/^./, m => m.toUpperCase())
    return { date: d, dia, semana }
  }),
  visible: 3,
  start: 0,
  selected: 0,

  move(dir) {
    if (dir === 'left') {
      this.start = Math.max(this.start - 1, 0)
    } else {
      this.start = Math.min(this.start + 1, this.days.length - this.visible)
    }
  },

  select(idx) {
    this.selected = idx
    this.$dispatch('dia-selected', this.days[idx].date)
  }
}))
