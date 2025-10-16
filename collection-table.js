// Convert part name to corresponding image filename
function partNameToFilename(name) {
  return name.replace(/\s+/g, "") + ".webp";
}
// Dynamically generate Beyblade Collection table and Wiki tables from randomizer-parts.json
document.addEventListener("DOMContentLoaded", function () {
  fetch("randomizer-parts.json")
    .then((response) => response.json())
    .then((parts) => {
      // Collection Table
      // Collection Page: Three separate tables for Blade, Ratchet, Bit
      const collectionBladeTbody = document.getElementById(
        "collection-blade-tbody"
      );
      const collectionRatchetTbody = document.getElementById(
        "collection-ratchet-tbody"
      );
      const collectionBitTbody = document.getElementById(
        "collection-bit-tbody"
      );
      const addCollectionRows = (tbody, partType, partList) => {
        if (!tbody) return;
        partList.forEach((name) => {
          const imgFile = partNameToFilename(name);
          const imgPath = `images/parts/${partType}/${imgFile}`;
          const tr = document.createElement("tr");
          tr.innerHTML = `
              <td class="randomizer-td"><input type="checkbox" /></td>
              <td class="randomizer-td">${name}</td>
              <td class="randomizer-td">
                <a class="img-link" href="${imgPath}" target="_blank">
                  <img src="${imgPath}" alt="${name}" style="max-width:120px;max-height:120px;display:block;margin:0 auto 4px auto;" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';" />
                </a>
                <a class="img-link" href="${imgPath}" target="_blank" style="display:none;">${imgFile}</a>
              </td>
            `;
          tbody.appendChild(tr);
        });
      };
      addCollectionRows(collectionBladeTbody, "Blade", parts.Blade);
      addCollectionRows(collectionRatchetTbody, "Ratchet", parts.Ratchet);
      addCollectionRows(collectionBitTbody, "Bit", parts.Bit);

      // Wiki Tables
      const bladeTbody = document.getElementById("blade-tbody");
      const ratchetTbody = document.getElementById("ratchet-tbody");
      const bitTbody = document.getElementById("bit-tbody");
      if (bladeTbody && ratchetTbody && bitTbody) {
        const sections = [
          { type: "Blade", list: parts.Blade, tbody: bladeTbody },
          { type: "Ratchet", list: parts.Ratchet, tbody: ratchetTbody },
          { type: "Bit", list: parts.Bit, tbody: bitTbody },
        ];
        sections.forEach(({ type, list, tbody }) => {
          list.forEach((name) => {
            const imgFile = partNameToFilename(name);
            const imgPath = `images/parts/${type}/${imgFile}`;
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td class="randomizer-td part-image-td">
                <a href="${imgPath}" target="_blank">
                  <img src="${imgPath}" alt="${name}" style="max-width:120px;max-height:120px;display:block;margin:0 auto 4px auto;" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';" />
                </a>
                <a href="${imgPath}" target="_blank" style="display:none;">${imgFile}</a>
              </td>
              <td class="randomizer-td">
                <div class="part-details-vertical">
                  <div><strong>Name:</strong> ${name}</div>
                  <div><strong>Class:</strong> ${type}</div>
                  <div><strong>Type:</strong> ${(() => {
                    const types = ["Attack", "Defense", "Stamina", "Balance"];
                    return types[list.indexOf(name) % 4];
                  })()}</div>
                </div>
              </td>
            `;
            tbody.appendChild(tr);
          });
        });
      }
    });
});
