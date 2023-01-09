import { closestItemByClass } from '../../../js/modules/utils.js'

export default class Hamburger {
  constructor($el) {
    this.html = document.documentElement
    this.$el = document.querySelector($el)

    this.init()
  }

  setup() {
    this.listeners()
  }

  listeners() {
    this.click()
    this.resize()
  }

  switcher() {
    const h = document.querySelector('.hamburger')
    if (!h.classList.contains('active')) {
      this.addClassActive()
    } else {
      this.removeClassActive()
    }
  }

  addClassActive = () => {
    this.$el.classList.add('active')
    document.body.classList.add('hamburger_active')
    const yOffset = this.html.getAttribute('data-yoffset')
    this.html.removeAttribute('data-yoffset')
    this.html.classList.remove('scroll-lock')
    window.scrollTo(0, yOffset)
    this.html.style.top = ''
  }

  removeClassActive = () => {
    this.$el.classList.remove('active')
    document.body.classList.remove('hamburger_active')
    document.body.classList.add('hamburger_inactive')
    const yOffset = this.html.getAttribute('data-yoffset')
    this.html.removeAttribute('data-yoffset')
    this.html.classList.remove('scroll-lock')
    window.scrollTo(0, yOffset)
    this.html.style.top = ''

    setTimeout(() => {
      document.body.classList.remove('hamburger_inactive')
    }, 200)
  }

  click() {
    this.$el.addEventListener('click', (event) => {
      let target = event.target
      if (closestItemByClass(target, 'hamburger')) {
        this.switcher()
      }
    })
  }

  resize() {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992) {
        this.removeClassActive(this.$el)
      }
    })
  }

  init() {
    this.setup()
  }
}
