const getTableRowTemplate = (row, deleteTarget, deleteButtonClass) => {
  let tableCellsTemplate = '';
  row.forEach((cell) => {
    tableCellsTemplate += `<td>${cell}</td>`;
  });
  return `
    <tr>
      ${tableCellsTemplate}
      <td><button class="${deleteButtonClass}" data-delete-target="${deleteTarget}">삭제</button></td>
    </tr>
  `;
};

export const getTableRowsTemplate = (
  rows,
  deleteTargetCellIndex,
  deleteButtonClass
) => {
  let rowItemsTemplate = '';
  rows.forEach((row) => {
    rowItemsTemplate += getTableRowTemplate(
      row,
      row[deleteTargetCellIndex],
      deleteButtonClass
    );
  });

  return rowItemsTemplate;
};

export default {
  getTableRowsTemplate,
};
