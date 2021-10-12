/* eslint-disable no-undef */

export default () => {
  const map = document.querySelector('#map')
  const coordinates = map.dataset.coordinates
  const apikey = map.dataset.apikey
  const address = map.dataset.address

  const ymapInit = () => {
    ymaps.ready(function () {
      var myMap = new ymaps.Map(
          'map',
          {
            center: coordinates.split(','),
            zoom: 16,
            controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'routeButtonControl'],
          },
          {
            searchControlProvider: 'yandex#search',
          }
        ),
        myPlacemark = new ymaps.Placemark(
          myMap.getCenter(),
          {
            balloonContent: address,
          },
          {
            iconLayout: 'default#image',
            iconImageHref: 'img/myIcon.gif',
            iconImageSize: [30, 42],
            iconImageOffset: [5, -28],
          }
        )

      myMap.geoObjects.add(myPlacemark)
      myMap.behaviors.disable('scrollZoom')
    })
  }

  const ymapLoad = function () {
    if (typeof ymaps !== 'undefined') {
      return
    }

    const script = document.createElement('script')
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=<${apikey}>`

    document.body.appendChild(script)
    script.addEventListener('load', ymapInit)
  }

  const handler = (entries) => {
    if (entries[0].isIntersecting) {
      ymapLoad()
    }
  }
  const observer = new window.IntersectionObserver(handler, {
    root: null,
    rootMargin: '500px',
  })

  observer.observe(map)
}
