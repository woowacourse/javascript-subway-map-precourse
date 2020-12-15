import { printLayout, createMap } from "./templates.js";
import { loadLines } from "../line/actions.js";

export default function MapPrintManager() {
  const lines = loadLines();

  printLayout(lines);
  createMap(lines);
}
