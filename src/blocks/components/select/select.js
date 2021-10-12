export default class Select {
  constructor(options) {
    if (typeof options.element === 'string') {
      this.el = document.querySelector(options.element)
    }
    if (typeof options.element === 'object') {
      this.el = options.element
    }

    this.placeholder = document.querySelector(options.placeholder)
    this.hiddenInput = options.hiddenInput

    this.setup()
  }

  setup() {
    this.trigger = this.el.querySelector('.select__trigger')
    this.item = this.el.querySelectorAll('.select__option')
    this.backdrop = this.el.querySelector('.select__backdrop')

    this.button = document.createElement('button')
    this.createHiddenButton()
    this.isAnimated = false

    if (this.hiddenInput) {
      this.input = document.createElement('input')
      this.createHiddenInput(this.currentItem)
    }

    if (this.placeholder) {
      this.select(this.placeholder)
    }

    this.listeners()
  }

  listeners() {
    this.trigger.addEventListener('click', () => {
      if (this.el.classList.contains('select-open')) {
        this.close()
      } else {
        this.open()
      }
    })

    this.item.forEach((el) => {
      el.addEventListener('click', () => {
        this.select(el)
        this.close()

        if (this.hiddenInput) {
          this.input.remove()
          this.createHiddenInput(this.currentItem)
        }
      })
    })

    this.backdrop.addEventListener('click', () => {
      this.close()
    })

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape' && this.el.classList.contains('select-open')) {
        this.close()
      }

      if (
        e.key === 'Tab' &&
        this.el.classList.contains('select-open') &&
        e.target.classList.contains('forNavigationWithKeyboard')
      ) {
        this.trigger.focus()
      }
    })
  }

  open() {
    this.el.classList.add('select-open')
    this.currentItem.focus()
    this.el.appendChild(this.button)
  }

  close() {
    this.isAnimated = true
    this.el.classList.add('select-close')
    this.trigger.focus()
    this.button.remove()
    this.el.classList.remove('select-open')
    this.el.classList.remove('select-close')
    this.isAnimated = false
  }

  select(el) {
    this.el.querySelector('.select__trigger-text').textContent = el.textContent

    this.item.forEach((el) => {
      el.classList.remove('selected')
    })

    el.classList.add('selected')
    this.currentItem = el
  }

  createHiddenButton() {
    this.button.classList.add('forNavigationWithKeyboard')
    this.button.setAttribute('aria-hidden', 'true')
    this.currentItem = this.el.querySelector('.selected')
  }

  createHiddenInput(el) {
    this.input.setAttribute('type', 'hidden')
    this.input.setAttribute('name', el.textContent)
    this.input.setAttribute('value', el.textContent)
    this.input.classList.add('input-hidden')
    this.el.append(this.input)
  }
}
