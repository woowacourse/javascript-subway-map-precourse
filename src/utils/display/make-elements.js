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
