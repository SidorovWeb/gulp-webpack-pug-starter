import './modules/stickyHeader.js'
import './modules/replaceImage.js'
import './modules/dragstart.js'
import 'focus-visible/dist/focus-visible.js'
import '../blocks/components/video/video.js'
import switcherThemes from './modules/switcherThemes.js'
import Modal from '../blocks/components/modal/modal.js'
import Select from '../blocks/components/select/select.js'
import Collapse from '../blocks/components/collapse/collapse.js'
import Accordion from '../blocks/components/accordion/accordion.js'
import swiperSlider from '../blocks/components/slider/slider.js'
import Hamburger from '../blocks/components/hamburger/hamburger.js'
import Form from '../blocks/components/form/form.js'
import Quiz from '../blocks/components/quiz/quiz.js'
import imask from './modules/imask.js'
import yandexMap from './modules/yandexMap.js'
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

  new Quiz('.quiz', {
    // navigation: false, // Отключить навигацию
    navigation: {
      prevEl: '.quiz__prev',
      nextEl: '.quiz__next',
    },
    progress: true, //  По дефолту 'line', выводится в '.quiz'.
    // progress: {
    // name: 'step', // Может быть 'line' или 'step'
    // output: 'Имя класса', // куда вывести progress
    // },
    fraction: true, // По дефолту выводится в '.quiz'
    // fraction: {
    //   delimiter: 'из', // По дефолту '/'
    //   output: 'Имя класса', // куда вывести fraction
    // },
    printValue: {
      // вывод значений, по дефолту не выводится
      where: '.quiz-output-values', // куда вывести printValue
      tagWrapper: 'span', // в какой tag
    },
    errorMessage: 'Вы ничего не выбрали', // По дефолту не выводит
    // errorMessage: false
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

  imask()

  yandexMap()

  new Hamburger('.hamburger')
  // При активации на body вешается класс '.hamburger_active'
  // При закрытии на body вешается класс '.hamburger_inactive'
})
