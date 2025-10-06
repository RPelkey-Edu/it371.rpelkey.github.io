// Dynamically load navbar.html into the #navbar-container element
window.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("navbar-container").innerHTML = html;
      // Highlight current page link
      var links = document.querySelectorAll("#navbar-container nav ul li a");
      var current = window.location.pathname.split("/").pop();
      links.forEach(function (link) {
        if (link.getAttribute("href") === current) {
          link.classList.add("active-nav");
        }
      });
    });
});
