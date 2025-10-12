// --- Download CSV/JSON of selected parts ---
// This function gathers all selected parts from the collection table
function getSelectedParts() {
  const rows = document.querySelectorAll("#collection-tbody tr");
  const selected = [];
  rows.forEach((row) => {
    const checkbox = row.querySelector('input[type="checkbox"]');
    const partType = row.children[1]?.textContent;
    const name = row.children[2]?.textContent;
    if (checkbox && checkbox.checked) {
      selected.push({ part: partType, name });
    }
  });
  return selected;
}
// This function creates and triggers a download of a file with given content and MIME type
function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}
// Set up event listeners for download buttons
document.addEventListener("DOMContentLoaded", function () {
  const btnCsv = document.getElementById("download-selected-csv");
  const btnJson = document.getElementById("download-selected-json");
  // Hide download buttons by default
  if (btnCsv) btnCsv.style.display = "none";
  if (btnJson) btnJson.style.display = "none";
  if (btnCsv) {
    btnCsv.addEventListener("click", function () {
      const selected = getSelectedParts();
      let csv = "Part,Name\n";
      selected.forEach((item) => {
        csv += `"${item.part}","${item.name}"\n`;
      });
      downloadFile("selected_parts.csv", csv, "text/csv");
    });
  }
  if (btnJson) {
    btnJson.addEventListener("click", function () {
      const selected = getSelectedParts();
      downloadFile(
        "selected_parts.json",
        JSON.stringify(selected, null, 2),
        "application/json"
      );
    });
  }
});
// Handles counting selected Blades, Ratchets, and Bits in the collection table
function countSelectedParts() {
  const rows = document.querySelectorAll("#collection-tbody tr");
  let bladeCount = 0,
    ratchetCount = 0,
    bitCount = 0;
  rows.forEach((row) => {
    const checkbox = row.querySelector('input[type="checkbox"]');
    const partType = row.children[1]?.textContent;
    if (checkbox && checkbox.checked) {
      if (partType === "Blade") bladeCount++;
      else if (partType === "Ratchet") ratchetCount++;
      else if (partType === "Bit") bitCount++;
    }
  });
  document.getElementById(
    "selected-count-result"
  ).textContent = `Selected: Blades: ${bladeCount}, Ratchets: ${ratchetCount}, Bits: ${bitCount}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("count-selected-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      countSelectedParts();
      if (btnCsv) btnCsv.style.display = "";
      if (btnJson) btnJson.style.display = "";
    });
  }
});
