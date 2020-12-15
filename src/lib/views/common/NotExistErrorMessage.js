import Typography from "../components/Typography.js";
import { NOT_EXIST_LINE_ERROR_MESSAGE } from "./helperTexts.js";

export default () => {
  const $emptyMessage = new Typography(NOT_EXIST_LINE_ERROR_MESSAGE, "h2");
  return $emptyMessage.element;
};
