// import cssVars from "css-vars-ponyfill";

const switcherThemes = () => {
  const switchers = document.querySelectorAll('.switch-mode')
  // const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  // const themeLight = {};
  // const themeDark = {
  //     // Заполнить объект для поддерки ei11
  //     // Вносить только те переменные которые необходимо изменять
  //     "$main-bg": " #000000",
  //     "$black": "#ffffff",
  // };

  //  Заполняем объект themeLight
  // if (isIE11) {
  //     cssVars({
  //         onComplete: function (cssText, styleElms, cssVariables) {
  //             for (var prop in cssVariables) {
  //                 themeLight[prop] = cssVariables[prop];
  //             }
  //         },
  //     });

  //     if (localStorage.getItem("theme") === "theme-light") {
  //         cssVars({
  //             variables: themeLight,
  //         });
  //     } else {
  //         cssVars({
  //             variables: themeDark,
  //         });
  //     }
  // }

  switchers.forEach((sw) => {
    sw.addEventListener('click', () => {
      window.toggleTheme()

      document.documentElement.classList.add('theme-transition')
      document.documentElement.classList.add('js-focus-visible') // fix, если не добавить класс слетает

      window.setTimeout(function () {
        document.documentElement.classList.remove('theme-transition')
        document.documentElement.classList.add('js-focus-visible') // fix, если не добавить класс слетает
      }, 150)

      // if (isIE11) {
      //     if (localStorage.getItem("theme") === "theme-light") {
      //         cssVars({
      //             variables: themeLight,
      //         });
      //     } else {
      //         cssVars({
      //             variables: themeDark,
      //         });
      //     }
      // }
    })
  })
}

export default switcherThemes
