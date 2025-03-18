"use strict";

window.addEventListener("scroll", function () {
    let scroll = document.querySelector(".scrollTop");
    scroll.classList.toggle("active", window.scrollY > 200);
});
