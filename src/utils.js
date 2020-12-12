const app = document.getElementById('app');

export const clearPage = () => {
  const contents = app.childNodes;
  let i = contents.length;
  while (i-- > 4) {
    app.removeChild(contents[i]);
  }
};
