import Table from "../../views/components/Table/Table.js";
import { TABLE_CONTAINER_DIV } from "../../common/IdAndClassNames.js";

export default (props) => {
  const $tableContainer = document.querySelector(TABLE_CONTAINER_DIV);
  const $newTable = new Table(props);
  $tableContainer.removeChild($tableContainer.lastChild);
  $tableContainer.appendChild($newTable.createNewTable());
};
