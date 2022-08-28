import { focusElements, isScroll, isScrollLock, bodyScrollControl } from '../../../js/modules/utils.js'

export default class Modal {
  constructor(options) {
    this.triggers = document.querySelectorAll(options.trigger)
    this.closeBtns = document.querySelectorAll(options.close)
    this.modal = document.querySelector(options.modal)
    this.modalClassName = options.modal
    this.touch = options.touch

    this.init()
  }

  init() {
    if (!this.modal) {
      throw new Error('Обязательные опции: modal, trigger, close ')
    }

    this.setup()
    this.listeners()
  }

  setup() {
    this.isOpened = false
    this.nextWindows = false
    this.firstTrigger = null
    this.currentModal = null
    this.focusElements = focusElements()
    this.handlers = {
      touchstart: this.touchstart.bind(this),
      touchmove: this.touchmove.bind(this),
      touchend: this.touchend.bind(this),
      keydown: this.keydown.bind(this),
    }

    if (this.touch) {
      if (!this.touch.panel) {
        throw new Error('Обязательная опция: touch: {panel: `..`}')
      }
      if (!this.touch.window) {
        throw new Error('Обязательная опция: touch: {window: `..`}')
      }

      this.breakpoint = this.touch.breakpoint ?? 479.98
      this.panel = document.querySelector(this.touch.panel)
      this.window = document.querySelector(this.touch.window)
      this.windowInnerWidth = window.innerWidth
      this.windowHeight = this.modal.offsetHeight
      this.windowStartPosY = null
      this.windowEndPosY = null
      this.panelPosY = null
      this.posY = null
      this.startTime = null
      this.endTime = null
      this.closeValue = 1.6
      this.transition = `all 225ms ease-out 0s`

      if (this.breakpoint && this.windowInnerWidth <= this.breakpoint) {
        this.modal.classList.add('touch')
      }
    }
  }

  listeners() {
    if (this.triggers) {
      this.triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => this.open(trigger))
      })
    }

    this.closeBtns.forEach((cBtn) => {
      cBtn.addEventListener('click', this.close.bind(this))
    })

    document.querySelectorAll(this.modalClassName).forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target.classList.contains(this.modalClassName.slice(1))) {
          this.close()
        }
      })
    })

    window.addEventListener('resize', () => {
      if (this.breakpoint) {
        const windowInnerWidth = window.innerWidth

        if (windowInnerWidth <= this.breakpoint) {
          this.modal.classList.add('touch')
          this.panel.addEventListener('touchstart', this.handlers.touchstart, { passive: true })
        } else {
          if (this.modal.classList.contains('touch')) {
            this.modal.classList.remove('touch')
            this.panel.removeEventListener('touchstart', this.handlers.touchstart, { passive: true })
            this.panel.removeEventListener('touchmove', this.handlers.touchmove, { passive: true })
            this.panel.removeEventListener('touchend', this.handlers.touchend, { passive: true })
            this.panel.removeEventListener('touchcancel', this.handlers.touchend, { passive: true })
          }
        }
      }
    })
  }

  open(trigger) {
    window.addEventListener('keydown', this.handlers.keydown)

    if (this.modal.classList.contains('error')) {
      this.modal.classList.remove('error')
    }
    if (this.modal.classList.contains('success')) {
      this.modal.classList.remove('success')
    }

    this.isOpened = true

    let modalName = this.triggers.length != 0 ? trigger.dataset.trigger : this.modalClassName

    if (this.isOpened && !this.nextWindows) {
      this.firstTrigger = trigger
    }

    if (this.touch && this.breakpoint && this.windowInnerWidth <= this.breakpoint) {
      this.panel.addEventListener('touchstart', this.handlers.touchstart, { passive: true })
    }

    if (document.documentElement.classList.contains('scroll-lock')) {
      // Если окно уже открыто
      if (document.querySelector('.modal-open')) {
        document.querySelector('.modal-open').classList.remove('modal-open')
      }

      this.nextWindows = true
    }

    this.currentModal =
      this.triggers.length != 0 ? document.querySelector(`#${modalName}`) : document.querySelector(`${modalName}`)

    if (this.isOpened && isScroll('Height')) {
      bodyScrollControl()
    }
    this.currentModal.classList.remove('modal-close')
    this.currentModal.classList.add('modal-open')

    if (!this.nextWindows) {
      isScrollLock()
      this.nextWindows = true
    }

    this.focusControl()
  }

  close() {
    if (!this.isOpened) {
      return
    }

    this.nextWindows = false

    if (this.touch && this.breakpoint && this.windowInnerWidth <= this.breakpoint) {
      this.window.style.transform = ``
      this.window.style.transition = ``

      this.panel.removeEventListener('touchstart', this.handlers.touchstart, { passive: true })
      this.panel.removeEventListener('touchmove', this.handlers.touchmove, { passive: true })
      this.panel.removeEventListener('touchend', this.handlers.touchend, { passive: true })
      this.panel.removeEventListener('touchcancel', this.handlers.touchend, { passive: true })
    }

    document.querySelectorAll(this.modalClassName).forEach((modal) => {
      modal.classList.add('modal-close')
      modal.classList.remove('modal-open')
    })

    this.isOpened = false

    bodyScrollControl()
    isScrollLock()
    this.focusControl()

    window.removeEventListener('keydown', this.handlers.keydown)
  }

  keydown(e) {
    if (e.key === 'Escape' && this.isOpened && this.currentModal.classList.contains('modal-open')) {
      e.preventDefault()
      this.close()
    }

    if (e.key === 'Tab' && this.isOpened) {
      this.focusCatcher(e)
    }
  }

  touchstart(e) {
    this.panelPosY = e.touches[0].clientY
    this.windowStartPosY = this.window.getBoundingClientRect().top
    this.startTime = Math.round(e.timeStamp)

    this.panel.addEventListener('touchmove', this.handlers.touchmove, { passive: true })
    this.panel.addEventListener('touchend', this.handlers.touchend, { passive: true })
    this.panel.addEventListener('touchcancel', this.handlers.touchend, { passive: true })
  }

  touchmove(e) {
    this.posY = e.touches[0].clientY

    if (this.posY - this.panelPosY < 0) {
      return
    }

    this.window.style.transition = `initial`
    this.window.style.transform = `translate3d(0px,${this.posY - this.panelPosY}px,1px)`
  }

  touchend(e) {
    this.endTime = Math.round(e.timeStamp)

    const speed = Math.round(this.startTime) - Math.round(this.endTime)
    this.windowEndPosY = this.window.getBoundingClientRect().top

    if (Math.abs(speed) < 100 && this.windowEndPosY > this.windowStartPosY) {
      this.endOptions()
      return
    }

    if (this.posY >= this.windowStartPosY * this.closeValue) {
      this.endOptions()
      return
    }

    this.window.style.transform = `translate3d(0px,0px,1px)`
    this.window.style.transition = this.transition
  }

  endOptions() {
    this.window.style.transform = `translate3d(0px,${this.windowHeight}px,1px)`
    this.window.style.transition = this.transition
    this.close()
  }

  focusControl() {
    const nodes = this.currentModal.querySelectorAll(this.focusElements)

    if (this.isOpened) {
      if (nodes.length) {
        setTimeout(() => {
          nodes[0].focus()
        }, 100)
      }
    }

    if (this.firstTrigger) {
      this.firstTrigger.focus()
    }
  }

  focusCatcher(e) {
    const nodes = this.currentModal.querySelectorAll(this.focusElements)
    const nodesArray = Array.prototype.slice.call(nodes)

    if (!this.currentModal.contains(document.activeElement)) {
      nodesArray[0].focus()
      e.preventDefault()
    } else {
      const focusedItemIndex = nodesArray.indexOf(document.activeElement)
      if (e.shiftKey && focusedItemIndex === 0) {
        setTimeout(() => {
          nodesArray[nodesArray.length - 1].focus()
        }, 0)
      }
      if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
        nodesArray[0].focus()
        e.preventDefault()
      }
    }
  }
}
