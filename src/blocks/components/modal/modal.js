import { focusElements, isScroll, isScrollLock, bodyScrollControl } from '../../../js/modules/utils.js'

export default class Modal {
  constructor(options) {
    this.triggers = document.querySelectorAll(options.trigger)
    this.closeBtns = document.querySelectorAll(options.close)
    this.modal = document.querySelector(options.modal)
    this.modalClassName = options.modal

    this.init()
  }

  init() {
    if (!this.modal) {
      throw new Error('Обязательные опции: modal')
    }
    if (!this.triggers) {
      throw new Error('Обязательные опции: trigger')
    }
    if (!this.closeBtns) {
      throw new Error('Обязательные опции: close')
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
  }

  open(trigger) {
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
      isScrollLock(true)
      this.nextWindows = true
    }

    this.focusControl()
  }

  close() {
    if (!this.isOpened) {
      return
    }

    this.nextWindows = false

    document.querySelectorAll(this.modalClassName).forEach((modal) => {
      modal.classList.add('modal-close')
      modal.classList.remove('modal-open')
    })

    this.isOpened = false

    bodyScrollControl()
    isScrollLock(false)
    this.focusControl()

    const forms = this.modal.querySelectorAll('form')
    if (forms) {
      forms.forEach((f) => {
        f.reset()
      })
    }
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
