export default () => {
  const $head = document.querySelector("head");
  $head.innerHTML = `
    <style>
      table, th, td {
        border: 1px solid black;
      }
    </style>
  `;
};
