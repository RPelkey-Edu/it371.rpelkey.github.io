// scroll-to-top.js
// Adds a scroll-to-top button that appears after scrolling down 1-2 pages

document.addEventListener("DOMContentLoaded", function () {
  // Create the button if it doesn't exist
  let scrollBtn = document.getElementById("scrollTopBtn");
  if (!scrollBtn) {
    scrollBtn = document.createElement("button");
    scrollBtn.id = "scrollTopBtn";
    scrollBtn.title = "Back to Top";
    scrollBtn.innerHTML = "&#8679;";
    document.body.appendChild(scrollBtn);
  }
  // Show/hide logic
  window.addEventListener("scroll", function () {
    if (window.scrollY > window.innerHeight * 1.2) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });
  // Scroll to top on click
  scrollBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
});
