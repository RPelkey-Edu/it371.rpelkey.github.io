// Dynamically generate Beyblade Collection table from randomizer-parts.json
function partNameToFilename(name) {
  return name.replace(/\s+/g, "_") + ".jpg";
}

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
              <img src=\"${imgPath}\" alt=\"${name}\" style=\"max-width:80px;max-height:80px;display:block;margin:0 auto 4px auto;\" onerror=\"this.style.display='none'\" />
              <a class=\"img-link\" href=\"${imgPath}\" target=\"_blank\">${imgFile}</a>
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
