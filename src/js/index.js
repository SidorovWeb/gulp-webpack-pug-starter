// import './import/polyfill'
// import './import/svg4everybody'
// import './modules/svgLoad'
import './modules/stickyHeader'
import './modules/replaceImage'
import './modules/dragstart'
import 'focus-visible'
import '../blocks/components/video/video'
import switcherThemes from './modules/switcherThemes'
import Modal from '../blocks/components/modal/modal'
import Select from '../blocks/components/select/select'
import Collapse from '../blocks/components/collapse/collapse'
import Accordion from '../blocks/components/accordion/accordion'
import swiperSlider from '../blocks/components/slider/slider'
import hamburger from '../blocks/components/hamburger/hamburger'
import Menu from '../blocks/components/menu/menu'
import Form from '../blocks/components/form/form'
import Quiz from '../blocks/components/quiz/quiz'
import imask from './modules/imask'
import yandexMap from './modules/yandexMap'
// import touch from './modules/touch'
// import viewportOnMobile from './modules/viewportOnMobile'
// import smoothScroll from './modules/scroll-anchors'

window.addEventListener('DOMContentLoaded', () => {
  switcherThemes()
  // viewportOnMobile()

  new Modal({
    modal: '.modal',
    trigger: '.modal__trigger',
    close: '.modal__close',
    touch: {
      window: '.modal__window',
      panel: '.modal__top',
      breakpoint: 479.98, // default max-width:  479.98
    },
  })

  new Collapse({
    element: '.collapse',
  })

  new Select({
    element: '.select',
    placeholder: '.selected',
    hiddenInput: true,
  })

  new Accordion({
    element: '.block-2',
    title: '.block-2__title',
  })

  new Accordion({
    element: '.block-1',
    title: '.block-1__title',
    breakpoint: 991.98, // max-width
    activeIndex: 1,
  })

  new Quiz({
    name: '.quiz',
    slide: '.quiz__item',
    btnPrev: '.quiz__btn-prev',
    btnNext: '.quiz__btn-next',
    pagination: '.quiz__pagination',
    finish: '.quiz__finish',
    printText: {
      where: '.quiz__print-text',
      insert: 'span',
    },
  })

  new Form({
    form: '.quiz__form',
    errorClass: 'required',
    validClass: 'success',
    isValidClass: false,
    settings: {
      text: {
        required: 'Введите ваше имя!',
      },
      email: {
        required: 'Введите ваш email!',
        error: 'Email имеет неверный формат!',
      },
    },

    submitHandler: (form, event) => {
      sendDataQuiz(form, event)
    },
  })

  function sendDataQuiz(form) {
    const xhr = new XMLHttpRequest()
    const fd = new FormData(form)
    const quiz = document.querySelector('.quiz')

    xhr.addEventListener('load', function () {
      quiz.classList.add('success')
    })
    xhr.addEventListener('error', function () {
      quiz.classList.add('error')
    })
    xhr.open('POST', 'mail/mail.php')
    xhr.send(fd)
    form.reset()
  }

  new Menu({
    elementHamburger: '.hamburger',
    nav: '.nav',
  })

  const forms = document.querySelectorAll('.form')
  forms.forEach((form) => {
    new Form({
      form: form,
      errorClass: 'required',
      validClass: 'success',
      isValidClass: false,
      settings: {
        text: {
          required: 'Введите ваше имя!',
        },
        email: {
          required: 'Введите ваш email!',
          error: 'Email имеет неверный формат!',
        },
        phone: {
          required: 'Введите номер телефона!',
          error: 'Телефон имеет неверный формат!',
        },
        checkbox: {
          required: 'Согласии на обработку персональных данных!',
        },
      },
      submitHandler: (form, event) => {
        sendData(form, event)
      },
    })
  })

  function sendData(form, event) {
    const xhr = new XMLHttpRequest()
    const fd = new FormData(form)
    xhr.addEventListener('load', function () {
      if (form.closest('#modal')) {
        afterForm('success', event)
      } else {
        callModalWindow('.modal-success', event)
      }
    })
    xhr.addEventListener('error', function () {
      if (form.closest('#modal')) {
        afterForm('error', event)
      } else {
        callModalWindow('.modal-error', event)
      }
    })
    xhr.open('POST', 'mail/mail.php')
    xhr.send(fd)
    form.reset()
  }

  function afterForm(className, event) {
    const modal = document.querySelector('#modal')
    const modalWindow = document.querySelector('#modal .modal__window')
    const windowHeight = modalWindow.offsetHeight
    modalWindow.style.minHeight = `${windowHeight}px`
    modal.classList.add(`${className}`)

    setTimeout(() => {
      if (modal.classList.contains('modal-open')) {
        modal.classList.add('modal-close')
        modal.classList.remove('modal-open')
      }
      setTimeout(() => {
        modal.classList.remove(`${className}`)
        modalWindow.style.minHeight = ''
        event.submitter.focus()
      }, 0)
    }, 2000)
  }

  function callModalWindow(modalName, event) {
    const modal = new Modal({
      modal: modalName,
      close: '.modal__close',
    })
    modal.open()
    setTimeout(() => {
      modal.close()
      setTimeout(() => {
        event.submitter.focus()
      }, 0)
    }, 2000)
  }

  swiperSlider()

  hamburger()

  imask()

  yandexMap()
})
