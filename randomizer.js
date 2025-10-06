//Functions to pull random beyblade parts from JSON file and display them in the table
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("randomize-btn");
  const partA = document.getElementById("partA");
  const partB = document.getElementById("partB");
  const partC = document.getElementById("partC");

  let partOptions = null;

  function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  fetch("randomizer-parts.json")
    .then((response) => response.json())
    .then((data) => {
      partOptions = data;
    });

  btn.addEventListener("click", function () {
    if (!partOptions) {
      alert("Part options not loaded yet. Please try again in a moment.");
      return;
    }
    // Hide images before rolling
    document.getElementById("img-partA").style.display = "none";
    document.getElementById("img-partB").style.display = "none";
    document.getElementById("img-partC").style.display = "none";
    // Roll partC first
    const rolledC = randomFromArray(partOptions.partC);
    partC.textContent = rolledC;
    // If partC is 'Turbo', override partB
    let rolledB;
    if (rolledC === "Turbo") {
      rolledB = "Bit override";
    } else {
      rolledB = randomFromArray(partOptions.partB);
    }
    partB.textContent = rolledB;
    const rolledA = randomFromArray(partOptions.partA);
    partA.textContent = rolledA;
    // Update images for each part
    function partNameToFilename(name) {
      return name.replace(/\s+/g, "_");
    }
    var imgA = document.getElementById("img-partA");
    var imgB = document.getElementById("img-partB");
    var imgC = document.getElementById("img-partC");
    imgA.src = "images/common/" + partNameToFilename(rolledA) + ".jpg";
    imgA.alt = rolledA;
    imgA.style.display = "";
    imgB.src = "images/common/" + partNameToFilename(rolledB) + ".jpg";
    imgB.alt = rolledB;
    imgB.style.display = "";
    imgC.src = "images/common/" + partNameToFilename(rolledC) + ".jpg";
    imgC.alt = rolledC;
    imgC.style.display = "";
  });

  // Button color states now handled by CSS
});
