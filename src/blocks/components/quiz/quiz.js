export default class Quiz {
  constructor(quiz, options) {
    this.quiz = document.querySelector(quiz)
    this.elements = document.querySelectorAll('.quiz__item')
    this.navigation = options.navigation
    this.prevEl = this.navigation ? document.querySelector(this.navigation.prevEl) : null
    this.nextEl = this.navigation ? document.querySelector(this.navigation.nextEl) : null
    this.progress = options.progress
    this.progressOutput = this.progress ? document.querySelector(this.progress.output) ?? this.quiz : null
    this.progressName = this.progress ? options.progress.name ?? 'line' : null
    this.progressFill = null
    this.progressItems = null
    this.activeSet = 0
    this.fraction = options.fraction
    this.delimiter = options.fraction ? options.fraction.delimiter ?? '/' : null
    this.fractionOutput = this.fraction ? document.querySelector(this.fraction.output) ?? this.quiz : null
    this.target = null
    this.printValue = options.printValue ? document.querySelector(options.printValue.where) : null
    this.tagWrapper = this.printValue ? this.printValue.tagWrapper ?? 'span' : 'span'
    this.errorMessage = options.errorMessage ? options.errorMessage ?? 'Не выбран элемент' : null
    this.form = document.querySelector('.quiz__form') // необходимо проработать

    this.init()
  }

  setup() {
    if (this.navigation) {
      this.prevEl.classList.add('disabled')
      this.prevEl.disabled = true
    }

    this.callProgress()

    this.listeners()
  }

  listeners() {
    this.elements.forEach((item) => {
      item.addEventListener('click', (e) => {
        this.target = e.target

        if (!this.target.type) return

        if (this.target.type === 'submit') return

        if (this.quiz.classList.contains('error')) {
          this.quiz.classList.remove('error')
        }

        const elems = item.querySelectorAll(`.${this.target.className}`)
        const filtered = [...elems].filter((el) => el.getAttribute('type') === this.target.type)

        switch (this.target.type) {
          case 'button':
            filtered.forEach((el) => {
              el.classList.remove('selected')
            })

            item.classList.remove('selected')
            this.target.classList.add('selected')

            if (!this.navigation) {
              this.nextSlide()
            }
            break
          case 'checkbox':
            this.target.classList.toggle('selected')

            if (!this.navigation) {
              this.nextSlide()
            }
            break
          case 'radio':
            filtered.forEach((el) => {
              el.classList.remove('selected')
            })

            this.target.classList.toggle('selected')

            if (!this.navigation) {
              this.nextSlide()
            }
            break
          case 'text':
            this.target.addEventListener(
              'blur',
              (event) => {
                if (!event.target.value) {
                  event.target.classList.remove('selected')
                } else {
                  event.target.classList.add('selected')
                  event.target.dataset.quizValue = event.target.value

                  if (!this.navigation) {
                    this.nextSlide()
                  }
                }
              },
              true
            )

            break
        }

        if (this.getErrorElement()) {
          this.getErrorElement().remove()
        }
      })
    })

    if (this.navigation) {
      this.prevEl.addEventListener('click', () => {
        this.prevSlide()
      })

      this.nextEl.addEventListener('click', () => {
        this.nextSlide()
      })
    }
  }

  prevSlide() {
    const current = this.getCurrentClide()
    const prev = this.elements[this.getIndexCurrentSlide() - 1]

    if (this.quiz.classList.contains('error')) {
      this.quiz.classList.remove('error')
    }

    if (this.getErrorElement()) {
      this.getErrorElement().remove()
    }

    current.classList.remove('active')
    prev.classList.add('active')

    if (this.fraction) {
      const fractionCurrent = document.querySelector('.quiz-progress__fraction-current')
      fractionCurrent.innerHTML = this.getIndexCurrentSlide() + 1
    }

    if (this.progress) {
      if (this.progress && this.progressName === 'step') {
        const currentProgressItem = this.progressItems[this.getIndexCurrentSlide() + 1]
        currentProgressItem.classList.remove('active')
      } else {
        this.activeSet -= 1
        this.progressFill.style.width = this.getProgressValue()
      }
    }

    if (this.navigation) {
      this.nextEl.classList.remove('disabled')
      this.nextEl.disabled = false
    }

    // Если первый слайд
    if (this.getIndexCurrentSlide() === 0) {
      if (this.navigation) {
        this.prevEl.classList.add('disabled')
        this.prevEl.disabled = true
      }
    }
  }

  nextSlide() {
    const current = this.getCurrentClide()
    const next = this.elements[this.getIndexCurrentSlide() + 1]

    if (!current.querySelector('.selected')) {
      if (this.getErrorElement()) {
        this.getErrorElement().remove()
      }

      if (this.errorMessage) {
        const span = document.createElement('span')
        span.classList.add('error__message')
        span.innerHTML = this.errorMessage
        this.quiz.append(span)
      }

      this.quiz.classList.add('error')
      return
    }

    if (!next) {
      this.quiz.classList.add('hide-elements')

      const array = this.quiz.querySelectorAll(`.selected`)
      const inputHiden = document.querySelectorAll('.input-hidden')

      if (this.printValue) {
        const wrapper = document.createElement('div')
        wrapper.classList.add('print-text__wrapper')
        this.printValue.append(wrapper)

        array.forEach((item) => {
          const el = document.createElement(this.tagWrapper)
          el.innerHTML = item.dataset.quizValue
          el.classList.add('print-text__item')
          wrapper.append(el)
        })
      }

      inputHiden.forEach((ih) => {
        if (ih.dataset.quizHidden) {
          ih.remove()
        }
      })

      array.forEach((el) => {
        this.createHiddenInput(el.dataset.quizValue)
      })

      return
    }

    current.classList.remove('active')
    next.classList.add('active')

    if (this.fraction) {
      const fractionCurrent = document.querySelector('.quiz-progress__fraction-current')
      fractionCurrent.innerHTML = this.getIndexCurrentSlide() + 1
    }

    if (this.getErrorElement()) {
      this.getErrorElement().remove()
    }

    if (this.progress) {
      if (this.progress && this.progressName === 'step') {
        const currentProgressItem = this.progressItems[this.getIndexCurrentSlide()]
        currentProgressItem.classList.add('active')
      } else {
        this.activeSet += 1
        this.progressFill.style.width = this.getProgressValue()
      }
    }

    if (this.navigation) {
      this.prevEl.classList.remove('disabled')
      this.prevEl.disabled = false
    }
  }

  getIndexCurrentSlide() {
    let index
    this.elements.forEach((item, i) => {
      if (item.classList.contains('active')) {
        index = i
      }
    })

    return index
  }

  getCurrentClide() {
    return this.elements[this.getIndexCurrentSlide()]
  }

  createHiddenInput(value) {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', value)
    input.setAttribute('value', value)
    input.setAttribute('data-quiz-hidden', 'true')
    input.classList.add('input-hidden')
    this.form.append(input)
  }

  callProgress() {
    if (this.progress) {
      const wrapper = document.createElement('div')
      wrapper.classList.add('quiz-progress')

      if (this.progress && this.progressName === 'step') {
        wrapper.classList.add('quiz-progress--step')

        for (let i = 0; i < this.elements.length; i++) {
          const span = document.createElement('span')
          span.classList.add('quiz-progress__item')
          wrapper.append(span)
        }

        this.progressOutput.append(wrapper)

        const first = this.progressOutput.querySelectorAll(`.quiz-progress__item`)[0]
        first.classList.add('active')

        this.progressItems = this.progressOutput.querySelectorAll(`.quiz-progress__item`)
      } else {
        wrapper.classList.add('quiz-progress--line')

        this.progressFill = document.createElement('div')
        this.progressFill.classList.add('quiz-progress__fill')

        wrapper.append(this.progressFill)
        this.progressOutput.append(wrapper)
        this.activeSet += 1
        this.progressFill.style.width = this.getProgressValue()
      }
    }

    if (this.fraction) {
      const wrapper = document.createElement('div')
      const current = document.createElement('span')
      const total = document.createElement('span')

      wrapper.classList.add('quiz-progress__fraction')
      current.classList.add('quiz-progress__fraction-current')
      total.classList.add('quiz-progress__fraction-total')

      current.innerHTML = 1
      total.innerHTML = this.elements.length
      wrapper.append(current, ` ${this.delimiter} `, total)
      this.fractionOutput.append(wrapper)
    }
  }

  getProgressValue() {
    return (this.activeSet / this.elements.length) * 100 + '%'
  }

  getErrorElement() {
    return document.querySelector('.error__message')
  }

  init() {
    this.setup()
  }
}
