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

  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('focus', function () {
      mask = IMask(this, maskOptions)
    })

    elements[i].addEventListener('blur', function () {
      if (this.value.match('_')) {
        mask.masked.reset()
      }
    })
  }
}

export default imask
