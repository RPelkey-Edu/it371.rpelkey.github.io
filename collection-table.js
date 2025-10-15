// Convert part name to corresponding image filename
function partNameToFilename(name) {
  return name.replace(/\s+/g, "") + ".webp";
}
// Dynamically generate Beyblade Collection table from randomizer-parts.json
document.addEventListener("DOMContentLoaded", function () {
  fetch("randomizer-parts.json")
    .then((response) => response.json())
    .then((parts) => {
      const tbody = document.getElementById("collection-tbody");
      const addRows = (partType, partList) => {
        partList.forEach((name, idx) => {
          const tr = document.createElement("tr");
          const imgFile = partNameToFilename(name);
          // Determine folder for each part type
          let folder = "";
          if (partType === "Blade") folder = "Blade";
          else if (partType === "Ratchet") folder = "Ratchet";
          else if (partType === "Bit") folder = "Bit";
          const imgPath = `images/parts/${folder}/${imgFile}`;
          tr.innerHTML = `
            <td class=\"randomizer-td\"><input type=\"checkbox\" /></td>
            <td class=\"randomizer-td\">${partType}</td>
            <td class=\"randomizer-td\">${name}</td>
            <td class=\"randomizer-td\">
              <a class=\"img-link\" href=\"${imgPath}\" target=\"_blank\">
                <img src=\"${imgPath}\" alt=\"${name}\" style=\"max-width:120px;max-height:120px;display:block;margin:0 auto 4px auto;\" onerror=\"this.style.display='none'; this.nextElementSibling.style.display='inline';\" />
              </a>
              <a class=\"img-link\" href=\"${imgPath}\" target=\"_blank\" style=\"display:none;\">${imgFile}</a>
            </td>
          `;
          tbody.appendChild(tr);
        });
      };
      addRows("Blade", parts.Blade);
      addRows("Ratchet", parts.Ratchet);
      addRows("Bit", parts.Bit);
    });
});
// Dynamically generate Beyblade Collection table and Wiki tables from randomizer-parts.json
document.addEventListener("DOMContentLoaded", function () {
  fetch("randomizer-parts.json")
    .then((response) => response.json())
    .then((parts) => {
      // Collection Table
      const collectionTbody = document.getElementById("collection-tbody");
      if (collectionTbody) {
        const addRows = (partType, partList) => {
          partList.forEach((name, idx) => {
            const tr = document.createElement("tr");
            const imgFile = partNameToFilename(name);
            // Determine folder for each part type
            let folder = "";
            if (partType === "Blade") folder = "Blade";
            else if (partType === "Ratchet") folder = "Ratchet";
            else if (partType === "Bit") folder = "Bit";
            const imgPath = `images/parts/${folder}/${imgFile}`;
            tr.innerHTML = `
              <td class=\"randomizer-td\"><input type=\"checkbox\" /></td>
              <td class=\"randomizer-td\">${partType}</td>
              <td class=\"randomizer-td\">${name}</td>
              <td class=\"randomizer-td\">
                <a class=\"img-link\" href=\"${imgPath}\" target=\"_blank\">\n                  <img src=\"${imgPath}\" alt=\"${name}\" style=\"max-width:120px;max-height:120px;display:block;margin:0 auto 4px auto;\" onerror=\"this.style.display='none'; this.nextElementSibling.style.display='inline';\" />\n                </a>\n                <a class=\"img-link\" href=\"${imgPath}\" target=\"_blank\" style=\"display:none;\">${imgFile}</a>\n              </td>\n            `;
            collectionTbody.appendChild(tr);
          });
        };
        addRows("Blade", parts.Blade);
        addRows("Ratchet", parts.Ratchet);
        addRows("Bit", parts.Bit);
      }

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
