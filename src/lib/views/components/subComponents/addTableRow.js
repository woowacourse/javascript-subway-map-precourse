export default (tableRowSet) => {
  return tableRowSet.reduce(($tr, $tdData) => {
    const $td = document.createElement("td");
    if (typeof $tdData === "string") $td.innerText = $tdData;
    else $td.appendChild($tdData);
    $tr.appendChild($td);
    return $tr;
  }, document.createElement("tr"));
};
