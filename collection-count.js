// --- Download CSV/JSON of selected parts ---

// This function gathers all selected parts from the three collection tables
function getSelectedParts() {
  const tables = [
    { id: "collection-blade-tbody", part: "Blade" },
    { id: "collection-ratchet-tbody", part: "Ratchet" },
    { id: "collection-bit-tbody", part: "Bit" },
  ];
  const selected = [];
  tables.forEach(({ id, part }) => {
    const rows = document.querySelectorAll(`#${id} tr`);
    rows.forEach((row) => {
      const checkbox = row.querySelector('input[type="checkbox"]');
      const name = row.children[1]?.textContent;
      if (checkbox && checkbox.checked) {
        selected.push({ part, name });
      }
    });
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

// Handles counting selected Blades, Ratchets, and Bits in the new collection tables
function countSelectedParts() {
  let bladeCount = 0,
    ratchetCount = 0,
    bitCount = 0;
  // Count Blades
  document.querySelectorAll("#collection-blade-tbody tr").forEach((row) => {
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) bladeCount++;
  });
  // Count Ratchets
  document.querySelectorAll("#collection-ratchet-tbody tr").forEach((row) => {
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) ratchetCount++;
  });
  // Count Bits
  document.querySelectorAll("#collection-bit-tbody tr").forEach((row) => {
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) bitCount++;
  });
  document.getElementById(
    "selected-count-result"
  ).textContent = `Selected: Blades: ${bladeCount}, Ratchets: ${ratchetCount}, Bits: ${bitCount}`;
  // Show extra message after counting
  document.getElementById("count-extra-message").textContent =
    "Use the buttons above to download your selected parts as formatted CSV or JSON!";
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

  // Set up count button handler here so btnCsv/btnJson are in scope
  const btn = document.getElementById("count-selected-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      countSelectedParts();
      if (btnCsv) btnCsv.style.display = "";
      if (btnJson) btnJson.style.display = "";
    });
  }
});
