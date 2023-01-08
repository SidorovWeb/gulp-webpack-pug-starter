import supportsWebP from 'supports-webp'
import { elementWatcher } from './observer.js'

let arr = document.querySelectorAll('[data-bg-replace-webp]')

elementWatcher(arr, imageReplace)

function imageReplace(elem) {
  supportsWebP.then((supported) => {
    if (supported) {
      const dataSrcReplaceWebp = elem.getAttribute('data-bg-replace-webp')
      elem.style.backgroundImage = `url('${dataSrcReplaceWebp}')`
      elem.classList.add('fadeIn')
      elem.removeAttribute('data-bg')
      elem.removeAttribute('data-bg-replace-webp')
    } else {
      // console.log(elem,'Load JPEG!')
      const dataSrc = elem.getAttribute('data-bg')
      elem.style.backgroundImage = `url('${dataSrc}')`
      elem.classList.add('fadeIn')
      elem.removeAttribute('data-bg')
      elem.removeAttribute('data-bg-replace-webp')
    }
  })
}
