document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("randomize-btn");
  const partA = document.getElementById("partA");
  const partB = document.getElementById("partB");
  const partC = document.getElementById("partC");

  function randomNum() {
    return String(Math.floor(Math.random() * 100)).padStart(2, "0");
  }

  btn.addEventListener("click", function () {
    partA.textContent = "Beyblade Part A " + randomNum();
    partB.textContent = "Beyblade Part B " + randomNum();
    partC.textContent = "Beyblade Part C " + randomNum();
  });

  btn.addEventListener("mousedown", function () {
    btn.style.background = "#388e3c"; // Change color while pressed
  });
  btn.addEventListener("mouseup", function () {
    btn.style.background = "#1976d2"; // Restore color
  });
  btn.addEventListener("mouseleave", function () {
    btn.style.background = "#1976d2"; // Restore color if mouse leaves
  });
});
