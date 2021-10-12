const videos = document.querySelectorAll('.video')

videos.forEach((elem) => {
  elem.addEventListener('click', () => {
    const id = elem.querySelector('[data-youtube-video]').dataset.youtubeVideo
    const title = elem.querySelector('[data-youtube-video]').dataset.frameTitle
    const link = elem.querySelector('.video__link')
    const youtubePlay = document.querySelector('.youtube-play')
    const html = `
    <iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `

    elem.insertAdjacentHTML('afterbegin', html)
    youtubePlay.classList.add('fadeOut')
    setTimeout(() => {
      link.remove()
    }, 300)
  })
})

// function findVideos() {
//   let videos = document.querySelectorAll('.video');

//   for (let i = 0; i < videos.length; i++) {
//       setupVideo(videos[i]);
//   }
// }

// function setupVideo(video) {
//   let link = video.querySelector('.video__link');
//   let media = video.querySelector('.video__media');
//   let button = video.querySelector('.video__button');
//   let id = parseMediaURL(media);

//   video.addEventListener('click', () => {
//       let iframe = createIframe(id);

//       link.remove();
//       button.remove();
//       video.appendChild(iframe);
//   });

//   link.removeAttribute('href');
//   video.classList.add('video--enabled');
// }

// function parseMediaURL(media) {
//   let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
//   let url = media.src;
//   let match = url.match(regexp);

//   return match[1];
// }

// function createIframe(id) {
//   let iframe = document.createElement('iframe');

//   iframe.setAttribute('allowfullscreen', '');
//   iframe.setAttribute('allow', 'autoplay');
//   iframe.setAttribute('src', generateURL(id));
//   iframe.classList.add('video__media');

//   return iframe;
// }

// function generateURL(id) {
//   let query = '?rel=0&showinfo=0&autoplay=1';

//   return 'https://www.youtube.com/embed/' + id + query;
// }

// findVideos();
