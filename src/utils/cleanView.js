export const cleanView = () => {
  const parent = document.getElementById("app").children;
  for (let i = 0; i < parent.length; i += 1) {
    if (i >= 3) {
      parent[i].style.display = "none";
    }
  }
};
