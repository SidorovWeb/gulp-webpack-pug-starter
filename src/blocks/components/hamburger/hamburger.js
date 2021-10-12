import { closestItemByClass } from '../../../js/modules/utils'

function switcher(e) {
  if (closestItemByClass(e.target, 'hamburger')) {
    const hamburgers = document.querySelectorAll('.hamburger')
    hamburgers.forEach((el) => {
      el.classList.contains('active') ? el.classList.remove('active') : el.classList.add('active')
    })
  }
}

const hamburger = () => {
  document.addEventListener('click', switcher)
}

export default hamburger
