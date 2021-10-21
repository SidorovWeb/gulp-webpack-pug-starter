export default class Quiz {
  constructor(quiz, options) {
    this.quiz = document.querySelector(quiz)
    this.elements = document.querySelectorAll('.quiz__item')
    this.navigation = options.navigation
    this.prevEl = this.navigation ? document.querySelector(this.navigation.prevEl) : null
    this.nextEl = this.navigation ? document.querySelector(this.navigation.nextEl) : null

    this.pagination = options.pagination
    this.paginationItems = null
    this.paginationOutput = this.pagination ? document.querySelector(this.pagination.output) ?? this.quiz : null
    this.addPaginationClassName = this.pagination ? this.pagination.addClassName ?? '' : null

    this.target = null
    this.resul = []

    this.printValue = options.printValue ? document.querySelector(options.printValue.where) : null
    this.tagWrapper = this.printValue ? this.printValue.tagWrapper ?? 'span' : 'span'

    this.form = document.querySelector('.quiz__form') // необходимо проработать
    this.errorMessage = options.errorMessage ?? 'Не выбран элемент'

    this.init()
  }

  setup() {
    if (!this.quiz) {
      throw new Error('Обязательная опция "name"')
    }

    if (this.navigation) {
      this.prevEl.classList.add('disabled')
      this.prevEl.disabled = true
    }

    this.callPagination()

    this.listeners()
  }

  listeners() {
    this.elements.forEach((item) => {
      item.addEventListener('click', (e) => {
        this.target = e.target

        if (!this.target.type) return

        if (this.target.type === 'submit') return

        const activeElements = item.querySelectorAll(`.${this.target.className}`)
        const filtered = [...activeElements].filter((el) => el.getAttribute('type') === this.target.type)
        const errorText = document.querySelector('.error__message')

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
            // case 'tel':
            // case 'email':
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

        if (errorText) {
          errorText.remove()
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

  prevSlide() {
    const current = this.getCurrentClide()
    const prev = this.elements[this.getIndexCurrentSlide() - 1]
    const errorText = document.querySelector('.error__message')

    if (errorText) {
      errorText.remove()
    }

    current.classList.remove('active')
    prev.classList.add('active')

    if (this.pagination) {
      const currentPaginationItem = this.paginationItems[this.getIndexCurrentSlide() + 1]
      currentPaginationItem.classList.remove('active')
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

      // this.nextEl.focus()
    }
  }

  nextSlide() {
    const current = this.getCurrentClide()
    const next = this.elements[this.getIndexCurrentSlide() + 1]
    const errorText = document.querySelector('.error__message')

    if (!current.querySelector('.selected')) {
      if (errorText) {
        errorText.remove()
      }

      const span = document.createElement('span')

      span.classList.add('error__message')
      span.innerHTML = this.errorMessage
      this.quiz.append(span)

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

    if (errorText) {
      errorText.remove()
    }

    if (this.pagination) {
      const currentPaginationItem = this.paginationItems[this.getIndexCurrentSlide()]
      currentPaginationItem.classList.add('active')
    }

    if (this.navigation) {
      this.prevEl.classList.remove('disabled')
      this.prevEl.disabled = false
    }

    // Если последний слайд
    // if (this.getIndexCurrentSlide() === this.elements.length - 1) {
    //   this.nextEl.classList.add('disabled')
    //   this.nextEl.disabled = true
    // }
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

  callPagination() {
    if (this.pagination) {
      const wrapper = document.createElement('div')
      wrapper.classList.add('quiz-pagination')

      this.addPaginationClassName ? wrapper.classList.add(this.addPaginationClassName) : null

      for (let i = 0; i < this.elements.length; i++) {
        const span = document.createElement('span')
        span.classList.add('quiz-pagination__item')
        wrapper.append(span)
      }

      this.paginationOutput.append(wrapper)

      const first = this.paginationOutput.querySelectorAll(`.quiz-pagination__item`)[0]
      first.classList.add('active')

      this.paginationItems = this.paginationOutput.querySelectorAll(`.quiz-pagination__item`)
    }
  }

  init() {
    this.setup()
  }
}
