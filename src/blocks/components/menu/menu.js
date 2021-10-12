import { closestItemByClass, scrolLock, bodyScrollControl, getScroll } from '../../../js/modules/utils'

export default class Menu {
  constructor(options) {
    this.h = document.querySelector(options.elementHamburger)
    this.nav = document.querySelector(options.nav)

    this.init()
  }

  init() {
    this.setup()
    this.listeners()
  }

  setup() {
    this.isOpen = false

    if (!this.h) {
      throw new Error('Опция обязательна: elementHamburger')
    }

    if (!this.nav) {
      throw new Error('Опция обязательна: nav')
    }
  }

  listeners() {
    document.addEventListener('click', (e) => {
      if (!closestItemByClass(e.target, 'hamburger')) {
        return
      }

      e.preventDefault()

      if (closestItemByClass(e.target, 'hamburger') && !this.isOpen) {
        this.open()
      } else {
        this.close()
      }
    })

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992 && this.isOpen) {
        this.close()
      } else {
        if (this.nav.classList.contains('menu-close')) {
          this.nav.classList.remove('menu-close')
        }
      }
    })
  }
  open() {
    this.nav.classList.remove('menu-close')
    this.nav.classList.add('menu-open')

    if (!this.isOpened && getScroll('Height')) {
      bodyScrollControl()
    }

    scrolLock()
    this.isOpen = true
  }

  close() {
    this.nav.classList.add('menu-close')
    this.nav.classList.remove('menu-open')
    document.querySelectorAll('.hamburger').forEach((h) => {
      h.classList.remove('active')
    })
    bodyScrollControl()
    scrolLock()
    this.isOpen = false
  }
}
