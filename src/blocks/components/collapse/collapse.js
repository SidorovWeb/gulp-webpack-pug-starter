export default class Collapse {
  constructor(options) {
    this.elName = options.element
    this.el = document.querySelector(options.element)

    this.setup()
  }

  setup() {
    this.headers = this.el.querySelectorAll('[data-header]')

    this.listeners()
  }

  listeners() {
    this.headers.forEach((el) => {
      el.addEventListener('click', (event) => {
        this.show(event, el)
      })
    })
  }

  show(event, el) {
    event.preventDefault()

    if (!el.classList.contains('selected')) {
      const value = el.dataset.header
      const currentContent = el.closest(this.elName).querySelector(`[data-collapse-content=${value}]`)
      this.el.querySelectorAll('.selected').forEach((s) => {
        s.classList.remove('selected')
      })

      el.classList.add('selected')
      currentContent.classList.add('selected')
    }
  }
}
