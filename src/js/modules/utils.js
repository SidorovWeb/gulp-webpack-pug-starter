export function closestItemByClass(item, className) {
  let node = item

  while (node) {
    if (node.classList.contains(className)) {
      return node
    }

    node = node.parentElement
  }

  return null
}

export function isScrollLock() {
  const html = document.documentElement

  if (!html.classList.contains('scroll-lock')) {
    html.style.top = -window.pageYOffset + 'px'
    html.setAttribute('data-yoffset', window.pageYOffset)
    html.classList.add('scroll-lock')
  } else {
    const yOffset = html.getAttribute('data-yoffset')
    html.removeAttribute('data-yoffset')
    html.classList.remove('scroll-lock')
    window.scrollTo(0, yOffset)
    html.style.top = ''
  }
}

export function focusElements() {
  return [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    'select:not([disabled]):not([aria-hidden])',
    'textarea:not([disabled]):not([aria-hidden])',
    'button:not([disabled]):not([aria-hidden])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])',
  ]
}

export function isScroll(height) {
  var d = document,
    b = d.body,
    e = d.documentElement,
    c = 'client' + height
  height = 'scroll' + height
  return /CSS/.test(d.compatMode) ? e[c] < e[height] : b[c] < b[height]
}

export function bodyScrollControl() {
  const html = document.documentElement

  if (!html.classList.contains('scroll-lock')) {
    let marginSize = window.innerWidth - html.clientWidth
    if (marginSize) {
      html.style.marginRight = marginSize + 'px'
    }
  } else {
    html.style.marginRight = ''
  }
}

export function getAttr(elem, attr) {
  return elem.getAttribute(attr)
}
