import Table from "../../views/components/Table/Table.js";
import { TABLE_CONTAINER_DIV } from "../../common/IdAndClassNames.js";

export default ({ tabIndex, lineName }) => {
  const $tableContainer = document.querySelector(TABLE_CONTAINER_DIV);
  console.log($tableContainer);
};
