document.querySelectorAll('img, a').forEach((element) => {
    element.addEventListener('dragstart', function (event) {
        event.preventDefault();
    });
});
