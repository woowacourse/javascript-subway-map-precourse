const getTableRowTemplate = ({
  row,
  deleteTarget,
  deleteButtonClass,
  deletebuttonText,
}) => {
  let tableCellsTemplate = '';
  row.forEach((cell) => {
    tableCellsTemplate += `<td>${cell}</td>`;
  });
  return `
    <tr>
      ${tableCellsTemplate}
      <td><button class="${deleteButtonClass}" data-delete-target="${deleteTarget}">${deletebuttonText}</button></td>
    </tr>
  `;
};

export const getTableRowsTemplate = ({
  rows,
  deleteTargetCellIndex,
  deleteButtonClass,
  deleteButtonText,
}) => {
  let rowItemsTemplate = '';
  let defaultDeleteButtonText = '삭제';
  if (deleteButtonText) {
    defaultDeleteButtonText = deleteButtonText;
  }
  rows.forEach((row) => {
    const deleteTarget = row[deleteTargetCellIndex];
    rowItemsTemplate += getTableRowTemplate({
      row,
      deleteTarget,
      deleteButtonClass,
      deletebuttonText: defaultDeleteButtonText,
    });
  });

  return rowItemsTemplate;
};

export default {
  getTableRowsTemplate,
};
