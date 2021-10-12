import Swiper, { Navigation, Pagination } from 'swiper'

const swiperSlider = () => {
  new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    observer: true,
    observeParents: true,
    speed: 800,
    loopAdditionalSlides: 5,
    preloadImages: false,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      clickable: true,
    },
  })
}

export default swiperSlider
