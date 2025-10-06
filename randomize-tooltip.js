// Tooltip logic for randomize button
window.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("randomize-btn");
  const tooltip = document.getElementById("randomize-tooltip");
  if (!btn || !tooltip) return;
  // Show tooltip on mouse hover
  btn.addEventListener("mouseenter", function (e) {
    tooltip.textContent = "Press this to generate a random parts combination";
    tooltip.style.display = "block";
    const rect = btn.getBoundingClientRect();
    tooltip.style.left =
      rect.left +
      window.scrollX +
      rect.width / 2 -
      tooltip.offsetWidth / 2 +
      "px";
    tooltip.style.top =
      rect.top + window.scrollY - tooltip.offsetHeight - 8 + "px";
  });
  // Hide tooltip on mouse leave
  btn.addEventListener("mouseleave", function () {
    tooltip.style.display = "none";
  });
  // Tooltip position stays with the button
  btn.addEventListener("mousemove", function () {
    const rect = btn.getBoundingClientRect();
    tooltip.style.left =
      rect.left +
      window.scrollX +
      rect.width / 2 -
      tooltip.offsetWidth / 2 +
      "px";
    tooltip.style.top =
      rect.top + window.scrollY - tooltip.offsetHeight - 8 + "px";
  });
});
