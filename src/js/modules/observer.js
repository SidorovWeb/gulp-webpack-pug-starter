export function elementWatcher(arr, callback) {
  // устанавливаем настройки
  const options = {
    root: null,
    rootMargin: '500px',
    // threshold: 1
  }

  // создаем наблюдатель
  const observer = new IntersectionObserver((entries, observer) => {
    // для каждой записи-целевого элемента
    entries.forEach((entry) => {
      // если элемент является наблюдаемым
      if (entry.isIntersecting) {
        const elem = entry.target
        callback(elem)
        // прекращаем наблюдение
        observer.unobserve(elem)
      }
    })
  }, options)

  arr.forEach((i) => {
    observer.observe(i)
  })
}
