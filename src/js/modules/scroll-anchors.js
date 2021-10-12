const smoothScroll = function (targetEl, duration) {
  const headerElHeight = document.querySelector('.header').clientHeight
  let target = document.querySelector(targetEl)
  let targetPosition = target.getBoundingClientRect().top - headerElHeight
  let startPosition = window.pageYOffset
  let startTime = null

  const ease = function (t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  const animation = function (currentTime) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const run = ease(timeElapsed, startPosition, targetPosition, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }
  requestAnimationFrame(animation)
}

const scrollTo = function () {
  const links = document.querySelectorAll('.js-scroll')
  links.forEach((each) => {
    each.addEventListener('click', function () {
      const currentTarget = this.getAttribute('href')
      smoothScroll(currentTarget, 1000)
    })
  })
}

scrollTo()

export default smoothScroll
