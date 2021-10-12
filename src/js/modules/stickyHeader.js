const headerEl = document.querySelector('.header')

const handler = (entries) => {
  if (entries[0].isIntersecting) {
    headerEl.classList.remove('scroll')
  } else {
    headerEl.classList.add('scroll')
  }
}

const observer = new window.IntersectionObserver(handler)

observer.observe(headerEl)
