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
  const nameContainer = document.getElementById("download-name-container");
  const nameInput = document.getElementById("download-name-input");
  const nameLabel = document.getElementById("download-name-label");
  // Hide download buttons and name input by default
  if (btnCsv) btnCsv.style.display = "none";
  if (btnJson) btnJson.style.display = "none";
  if (nameContainer) nameContainer.style.display = "none";

  function getFileName(ext) {
    let val = nameInput && nameInput.value.trim();
    if (!val) return `selected_parts.${ext}`;
    // Remove illegal filename characters for most OSes
    val = val.replace(/[/\\?%*:|"<>]/g, "_");
    return val.endsWith(`.${ext}`) ? val : `${val}.${ext}`;
  }

  function afterDownload(filename) {
    if (nameInput) nameInput.value = "";
    if (nameLabel) nameLabel.textContent = `File ${filename} downloaded`;
    setTimeout(() => {
      if (nameLabel) nameLabel.textContent = "Enter download file name here";
    }, 2500);
  }

  if (btnCsv) {
    btnCsv.addEventListener("click", function () {
      const selected = getSelectedParts();
      let csv = "Part,Name\n";
      selected.forEach((item) => {
        csv += `"${item.part}","${item.name}"\n`;
      });
      const filename = getFileName("csv");
      downloadFile(filename, csv, "text/csv");
      afterDownload(filename);
    });
  }
  if (btnJson) {
    btnJson.addEventListener("click", function () {
      const selected = getSelectedParts();
      const filename = getFileName("json");
      downloadFile(
        filename,
        JSON.stringify(selected, null, 2),
        "application/json"
      );
      afterDownload(filename);
    });
  }

  // Set up count button handler here so btnCsv/btnJson are in scope
  const btn = document.getElementById("count-selected-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      countSelectedParts();
      if (btnCsv) btnCsv.style.display = "";
      if (btnJson) btnJson.style.display = "";
      if (nameContainer) nameContainer.style.display = "";
    });
  }
});
