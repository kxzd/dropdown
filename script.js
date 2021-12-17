const navButton = document.querySelector(".navbar-button");
const navBarLinks = document.querySelector(".navbar-links");

navButton.addEventListener("click", () => {
    navBarLinks.classList.toggle("active");
    navButton.classList.toggle("open");
})

