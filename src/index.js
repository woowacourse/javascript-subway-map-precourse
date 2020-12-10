const managerButtons = document.querySelectorAll(
  ".manager-button-group button"
);

function activeSelectedContainer(container, isSelected) {
  if (isSelected) {
    container.classList.add("active");
  }
}

function checkSelectedContainer(selectedButton) {
  const contentsContainers = document.querySelectorAll(".contents-container");
  contentsContainers.forEach(container => {
    container.classList.remove("active");

    const isSelected = container.dataset.title === selectedButton;
    activeSelectedContainer(container, isSelected);
  });
}

function handleManagerButton(e) {
  const selectedButton = e.target.dataset.title;
  checkSelectedContainer(selectedButton);
}

managerButtons.forEach(managerButton =>
  managerButton.addEventListener("click", handleManagerButton)
);
