export default () => {
  const el = document.querySelector('.touch')
  const elHeader = document.querySelector('.touch__header')
  const elStartPosY = el.getBoundingClientRect().top
  const elHeigth = el.offsetHeight
  const slopValue = elHeigth * (1 / 2.5)
  const transition = `all 300ms ease-out 0s`
  let elHeaderPosY = null
  let posY = null
  let startTime = null
  let endTime = null

  elHeader.addEventListener(
    'touchstart',
    (e) => {
      elHeaderPosY = e.touches[0].clientY
      startTime = Math.round(e.timeStamp)

      elHeader.addEventListener('touchmove', move, { passive: true })
      elHeader.addEventListener('touchend', end, { passive: true })
      elHeader.addEventListener('touchcancel', end, { passive: true })
      el.addEventListener('transitionend', transitionend)
    },
    { passive: true }
  )

  const move = (e) => {
    posY = e.touches[0].clientY

    if (posY - elHeaderPosY < 0) {
      return
    }

    // el.style.top = `${elStartPosY + (elStartPosY - elHeaderPosY)}px`
    el.style.top = `${elStartPosY + (elStartPosY - elHeaderPosY)}px`
    el.style.transition = `initial`
    el.style.transform = `translate3d(0px,${posY - elStartPosY}px,1px)`
    // el.style.transform = `translate3d(0px,${posY - elHeaderPosY}px,1px)`
  }

  const end = (e) => {
    endTime = Math.round(e.timeStamp)

    if (Math.abs(Math.round(startTime) - Math.round(endTime)) < 100) {
      endOptions()
      return
    }

    if (posY >= elStartPosY + slopValue) {
      endOptions()
      return
    }

    el.style.top = `${elStartPosY}px`
    el.style.transform = `translate3d(0px,0px,1px)`
    el.style.transition = transition
  }

  const transitionend = () => {
    el.removeEventListener('transitionend', transitionend)
    elHeader.removeEventListener('touchmove', move, { passive: true })
    elHeader.removeEventListener('touchend', end, { passive: true })
    elHeader.removeEventListener('touchcancel', end, { passive: true })
    el.style.top = ``
  }

  const endOptions = () => {
    el.style.top = `${elStartPosY}px`
    el.style.transform = `translate3d(0px,${elHeigth + 10}px,1px)`
    el.style.transition = transition
    el.classList.add('touchend')
  }
}
