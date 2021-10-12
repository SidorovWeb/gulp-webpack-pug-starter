export default class Accordion {
  constructor(options) {
    this.elName = options.element
    this.titleName = options.title
    this.breakpoint = options.breakpoint
    this.activeIdx = options.activeIndex
    this.elems = document.querySelectorAll(options.element)
    this.titles = document.querySelectorAll(options.title)

    try {
      this.setup()
    } catch (error) {
      return
    }
  }

  setup() {
    this.isAnimating = false
    this.listeners()
  }

  listeners() {
    const self = this
    const windowInnerWidth = window.innerWidth

    const click = function () {
      self.stateSwitch(this)
    }

    if (!this.breakpoint) {
      this.titles.forEach((t) => {
        t.addEventListener('click', (event) => {
          event.preventDefault()
          this.stateSwitch(t)
        })
      })

      this.elems.forEach((elem) => {
        elem.querySelectorAll('.open').forEach((el) => {
          this.setHeigthNES(el)
        })
      })
    }

    if (this.breakpoint && windowInnerWidth <= this.breakpoint) {
      document.querySelector(this.elName).classList.add('init')

      this.titles.forEach((t) => {
        t.addEventListener('click', click)

        if (!this.activeIdx) {
          this.addParamsNES(t)
        }
      })

      this.elems.forEach(() => {
        if (this.activeIdx) {
          this.activeIndex()
        }
      })
    } else {
      document.querySelector(this.elName).classList.remove('init')

      this.titles.forEach((t) => {
        t.removeEventListener('click', click)
      })
    }

    window.addEventListener('resize', () => {
      if (this.breakpoint) {
        const windowInnerWidth = window.innerWidth

        if (windowInnerWidth <= this.breakpoint) {
          document.querySelector(this.elName).classList.add('init')

          this.titles.forEach((t) => {
            t.addEventListener('click', click)
          })

          this.activeIndex()
        } else {
          document.querySelector(this.elName).classList.remove('init')

          this.titles.forEach((t) => {
            if (t.classList.contains('open')) {
              t.classList.remove('open')
            }

            this.removeParamsNES(t)

            t.removeEventListener('click', click)
          })
        }
      }
    })
  }

  open(element) {
    this.isAnimating = true
    let el = element.nextElementSibling

    el.style.height = `${el.scrollHeight}px`
    element.classList.add('open')
    el.classList.remove('is-collapsed')
    this.isAnimating = false
  }

  close(element) {
    this.isAnimating = true
    let el = element.nextElementSibling

    el.style.height = `${el.scrollHeight}px`
    el.classList.add('is-collapsed')
    el.style.height = ''
    element.classList.remove('open')
    this.isAnimating = false
  }

  stateSwitch(el) {
    if (this.isAnimating) return

    if (el.classList.contains('open')) {
      this.close(el)
    } else {
      this.open(el)
    }
  }

  activeIndex() {
    this.titles.forEach((t, idx) => {
      t.classList.remove('open')

      this.addParamsNES(t)

      if (idx === this.activeIdx) {
        t.classList.add('open')

        this.removeParamsNES(t)
        this.setHeigthNES(t)
      }
    })
  }

  setHeigthNES(el) {
    el.nextElementSibling.style.height = 'auto'
    el.nextElementSibling.style.height = `${el.nextElementSibling.scrollHeight}px`
  }

  addParamsNES(el) {
    el.nextElementSibling.classList.add('is-collapsed')
    el.nextElementSibling.style.height = ''
  }

  removeParamsNES(el) {
    el.nextElementSibling.classList.remove('is-collapsed')
    el.nextElementSibling.style.height = ''
  }
}
