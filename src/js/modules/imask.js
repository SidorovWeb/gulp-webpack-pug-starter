import IMask from 'imask'

const imask = () => {
  const elements = document.querySelectorAll('.imask')
  let mask
  const maskOptions = {
    mask: '+{7}{  }(000){  }000{-}00{-}00',
    overwrite: true,
    lazy: false,
    autofix: true,
    placeholderChar: '_',
  }

  elements.forEach((element) => {
    element.addEventListener('focus', function () {
      mask = IMask(element, maskOptions)
    })

    element.addEventListener('blur', function (e) {
      if (e.target.value.match('_')) {
        mask.masked.reset()
      }
    })
  })
}

export default imask
