export function makeTdElement(elementToMake) {
  const tdForText = document.createElement("td");

  tdForText.append(elementToMake);

  return tdForText;
}

export function makeTdDeleteBtn() {
  const tdForDeleteBtn = document.createElement("td");
  const deleteBtn = document.createElement("button");

  deleteBtn.innerHTML = "삭제";
  tdForDeleteBtn.append(deleteBtn);

  return tdForDeleteBtn;
}

export function makeOneRowWithDeleteBtn(objectToMake) {
  const tr = document.createElement("tr");
  const tdDeleteBtnHTML = makeTdDeleteBtn().outerHTML;
  let tdHTMLString = "";

  for (const [key, value] of Object.entries(objectToMake)) {
    const tdElementHTML = makeTdElement(value).outerHTML;

    tdHTMLString += tdElementHTML;
  }
  tdHTMLString += tdDeleteBtnHTML;

  return tdHTMLString;
}
