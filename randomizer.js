//Functions to pull random beyblade parts from JSON file and display them in the table
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("randomize-btn");
  const blade = document.getElementById("partA");
  const ratchet = document.getElementById("partB");
  const bit = document.getElementById("partC");

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
    // Roll Bit first
    const rolledBit = randomFromArray(partOptions.Bit);
    bit.textContent = rolledBit;
    // If Bit is 'Turbo', override Ratchet
    let rolledRatchet;
    if (rolledBit === "Turbo") {
      rolledRatchet = "Bit override";
    } else {
      rolledRatchet = randomFromArray(partOptions.Ratchet);
    }
    ratchet.textContent = rolledRatchet;
    const rolledBlade = randomFromArray(partOptions.Blade);
    blade.textContent = rolledBlade;
    // Update images for each part
    function partNameToFilename(name) {
      return name.replace(/\s+/g, "") + ".webp";
    }
    var imgA = document.getElementById("img-partA");
    var imgB = document.getElementById("img-partB");
    var imgC = document.getElementById("img-partC");
    imgA.src = "images/parts/Blade/" + partNameToFilename(rolledBlade);
    imgA.alt = rolledBlade;
    imgA.style.display = "";
    imgB.src = "images/parts/Ratchet/" + partNameToFilename(rolledRatchet);
    imgB.alt = rolledRatchet;
    imgB.style.display = "";
    imgC.src = "images/parts/Bit/" + partNameToFilename(rolledBit);
    imgC.alt = rolledBit;
    imgC.style.display = "";
  });

  // Button color states now handled by CSS
});
