var menuOpen = document.querySelector(".navigation__menu-open");
var menu = document.querySelector(".navigation__menu");
var menuClose = document.querySelector(".navigation__menu-close");

menuOpen.addEventListener("click", function (event) {
  event.preventDefault();
  menu.classList.add("navigation__menu--show");
});


menuClose.addEventListener("click", function (event) {
  event.preventDefault();
  menu.classList.remove("navigation__menu--show");
});
