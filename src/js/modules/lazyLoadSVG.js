import { elementWatcher } from './observer.js'
import { getAttr } from './utils.js'

const arr = document.querySelectorAll('[data-svg-name]')

function svgRepeat(elem) {
  const attr = ['data-svg-name']
  const dataName = getAttr(elem, attr)

  elem.insertAdjacentHTML(
    'afterbegin',
    `
    <use xlink:href="img/svg/${dataName}.svg#${dataName}"></use>`
  )
  elem.removeAttribute(attr)
}

elementWatcher(arr, svgRepeat)
