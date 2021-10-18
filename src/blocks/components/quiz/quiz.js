export default class Quiz {
  constructor(options) {
    this.quiz = document.querySelector(options.name)
    this.nameSlide = options.slide
    this.slides = document.querySelectorAll(options.slide)
    this.btnPrev = document.querySelector(options.btnPrev)
    this.btnNext = document.querySelector(options.btnNext)
    this.pagination = document.querySelector(options.pagination)
    this.paginationItems = null
    this.target = null
    this.resul = []
    this.finish = document.querySelector(options.finish)
    this.printText = document.querySelector(options.printText.where)
    this.createElemPrintText = options.printText.insert ?? 'span'

    this.form = document.querySelector('.quiz__form') // ?

    this.init()
  }

  setup() {
    if (!this.quiz) {
      throw new Error('Обязательная опция "name"')
    }
    if (!this.slides) {
      throw new Error('Обязательная опция "slide"')
    }

    this.btnPrev.classList.add('disabled')
    this.btnPrev.disabled = true

    if (this.pagination) {
      for (let i = 0; i < this.slides.length; i++) {
        const span = document.createElement('span')
        span.classList.add(`${this.quiz.className}__pagination-item`)
        this.pagination.append(span)
      }

      const first = this.pagination.querySelectorAll(`.${this.quiz.className}__pagination-item`)[0]
      first.classList.add('active')

      this.paginationItems = this.pagination.querySelectorAll(`.${this.quiz.className}__pagination-item`)
    }

    this.listeners()
  }

  listeners() {
    this.slides.forEach((item) => {
      item.addEventListener('click', (e) => {
        this.target = e.target

        if (!this.target.type) return

        if (this.target.type === 'submit') return

        const activeElements = item.querySelectorAll(`.${this.target.className}`)
        const filtered = [...activeElements].filter((el) => el.getAttribute('type') === this.target.type)
        const errorText = document.querySelector('.quiz-error')

        switch (this.target.type) {
          case 'button':
            filtered.forEach((el) => {
              el.classList.remove('selected')
            })

            item.classList.remove('selected')

            this.target.classList.toggle('selected')
            break
          case 'checkbox':
            this.target.classList.toggle('selected')
            break
          case 'radio':
            filtered.forEach((el) => {
              el.classList.remove('selected')
            })

            this.target.classList.toggle('selected')
            break
          case 'text':
            // case 'tel':
            // case 'email':
            this.target.addEventListener(
              'blur',
              function (event) {
                if (!event.target.value) {
                  event.target.classList.remove('selected')
                } else {
                  event.target.classList.add('selected')
                  event.target.dataset.quizValue = event.target.value
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

    this.btnPrev.addEventListener('click', () => {
      this.prevSlide()
    })

    this.btnNext.addEventListener('click', () => {
      this.nextSlide()
    })
  }

  getIndexCurrentSlide() {
    let index
    this.slides.forEach((item, i) => {
      if (item.classList.contains('active')) {
        index = i
      }
    })

    return index
  }

  getCurrentClide() {
    return this.slides[this.getIndexCurrentSlide()]
  }

  prevSlide() {
    const current = this.getCurrentClide()
    const prev = this.slides[this.getIndexCurrentSlide() - 1]

    current.classList.remove('active')
    prev.classList.add('active')

    this.btnNext.classList.remove('disabled')
    this.btnNext.disabled = false

    if (this.pagination) {
      const currentPaginationItem = this.paginationItems[this.getIndexCurrentSlide() + 1]
      currentPaginationItem.classList.remove('active')
    }

    // Если первый слайд
    if (this.getIndexCurrentSlide() === 0) {
      this.btnPrev.classList.add('disabled')
      this.btnPrev.disabled = true
      // this.btnNext.focus()
    }
  }

  nextSlide() {
    const current = this.getCurrentClide()
    const next = this.slides[this.getIndexCurrentSlide() + 1]
    const errorText = document.querySelector('.quiz-error')

    if (!current.querySelector('.selected')) {
      if (errorText) {
        errorText.remove()
      }

      const span = document.createElement('span')

      span.classList.add('quiz-error')
      span.innerHTML = 'Не выбран элемент'
      current.append(span)
      return
    }

    if (!next) {
      this.quiz.classList.add('hide-elements')
      const array = this.quiz.querySelectorAll(`.selected`)
      const inputHiden = document.querySelectorAll('.input-hidden')

      if (this.printText) {
        const wrapper = document.createElement('div')
        wrapper.classList.add('print-text__wrapper')
        this.printText.append(wrapper)

        array.forEach((item) => {
          const el = document.createElement(this.createElemPrintText)
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

    this.btnPrev.classList.remove('disabled')
    this.btnPrev.disabled = false

    if (errorText) {
      errorText.remove()
    }

    if (this.pagination) {
      const currentPaginationItem = this.paginationItems[this.getIndexCurrentSlide()]
      currentPaginationItem.classList.add('active')
    }

    // Если последний слайд
    // if (this.getIndexCurrentSlide() === this.slides.length - 1) {
    //   this.btnNext.classList.add('disabled')
    //   this.btnNext.disabled = true
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

  init() {
    this.setup()
  }
}
