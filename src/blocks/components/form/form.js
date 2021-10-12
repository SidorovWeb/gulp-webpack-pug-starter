export default class Form {
  constructor(options) {
    if (typeof options.form == 'string') {
      this.form = document.querySelector(options.form)
    }

    if (typeof options.form == 'object') {
      this.form = options.form
    }

    this.settings = options.settings
    this.errorClass = options.errorClass
    this.validClass = options.validClass
    this.isValidClass = options.isValidClass
    this.submitHandler = options.submitHandler

    this.init()
  }

  init() {
    if (!this.form) {
      throw new Error('Нет опции this.form')
    }

    this.setup()
    this.listeners()
  }

  setup() {
    this.requiredInputs = this.form.querySelectorAll('[data-required]')
    // eslint-disable-next-line no-useless-escape
    this.isValidEmail =
      /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.numberPattern = /\d+/g
    this.errorTextForCreatedEl = 'error-text'
    this.clickToSubmit = false

    if (!this.requiredInputs) {
      throw new Error('На инпуте нет атрибута data-required')
    }
  }

  listeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.clickToSubmit = false

      if (this.checkInputs()) {
        this.submitHandler(this.form, e)

        setTimeout(() => {
          if (this.isValidClass) {
            this.form.querySelectorAll(`.${this.validClass}`).forEach((vc) => {
              vc.classList.remove(this.validClass)
            })
          }
        }, 195)
      }
    })

    this.requiredInputs.forEach((input) => {
      input.addEventListener('input', () => {
        this.setSuccessFor(input)
      })
    })
  }

  checkInputs() {
    const array = []

    this.requiredInputs.forEach((input) => {
      const value = input.value.trim()
      array.push(this.validateInputs(input, value))
    })

    return array.includes(false) ? false : true
  }

  validateInputs(input, value) {
    const type = input.getAttribute('type')

    if (type === 'text') {
      return this.validText(input, value)
    }

    if (type === 'email') {
      return this.validEmail(input, value)
    }

    if (type === 'tel') {
      return this.validPhone(input, value)
    }

    if (type === 'checkbox') {
      return this.validCheckbox(input, input.checked)
    }
  }

  validText(input, value) {
    if (value === '') {
      return this.setErrorFor(input, this.settings['texe']['required'])
    } else {
      return this.setSuccessFor(input)
    }
  }

  validEmail(input, value) {
    if (value === '') {
      return this.setErrorFor(input, this.settings['email']['required'])
    } else if (!this.isValidEmail.test(value)) {
      return this.setErrorFor(input, this.settings['email']['error'])
    } else {
      return this.setSuccessFor(input)
    }
  }

  validPhone(input, value) {
    if (value === '') {
      return this.setErrorFor(input, this.settings['phone']['required'])
    } else if (value.match(this.numberPattern).join('').length !== 11) {
      return this.setErrorFor(input, this.settings['phone']['error'])
    } else {
      return this.setSuccessFor(input)
    }
  }

  validCheckbox(input, value) {
    if (value === false) {
      return this.setErrorFor(input, this.settings['checkbox']['required'])
    } else {
      return this.setSuccessFor(input)
    }
  }

  setErrorFor(input, message) {
    const formControl = input.parentElement
    const erroeElement = formControl.querySelector(`.${this.errorTextForCreatedEl}`)

    if (this.isValidClass) {
      formControl.classList.remove(this.validClass)
    }
    formControl.classList.add(this.errorClass)

    if (erroeElement) {
      erroeElement.remove()
    }

    formControl.append(this.createElementError(message))

    if (!this.clickToSubmit && formControl.classList.contains(this.errorClass)) {
      setTimeout(() => {
        this.form.querySelector(`.${this.errorClass} input`).focus()
      }, 195)
      this.clickToSubmit = true
    }

    return false
  }

  setSuccessFor(input) {
    const formControl = input.parentElement
    const erroeElement = formControl.querySelector(`.${this.errorTextForCreatedEl}`)

    if (erroeElement) {
      erroeElement.classList.add('hide-error-text')

      setTimeout(() => {
        formControl.classList.remove(this.errorClass)
        if (this.isValidClass) {
          formControl.classList.add(this.validClass)
        }
        erroeElement.remove()
      }, 195)
    }

    return true
  }

  createElementError(message) {
    const el = document.createElement('p')
    el.classList.add(this.errorTextForCreatedEl)
    el.innerText = message
    return el
  }

  get data() {
    const data = {}
    const formDataEntries = new FormData(this.form)
    for (let [name, value] of formDataEntries) {
      data[name] = value
    }

    return data
  }
}
