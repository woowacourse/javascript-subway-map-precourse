import { CLASS } from "../../utils/constants/dom.js";

export const createLineButtonsHTML = names => {
  return names.reduce((html, name) => {
    html += ButtonHTML(name);
    return html;
  }, ``);
};

const ButtonHTML = name => {
  return `<button class=${CLASS.SECTION_LINE_MENU_BUTTON} data-name="${name}" style="margin-right: 4px;"}>${name}</button>`;
};

export const createSectionOptionsHTML = names => {
  return names.reduce((html, name) => {
    html += OptionHTML(name);
    return html;
  }, ``);
};

const OptionHTML = name => {
  return `<option value=${name}>${name}</option>`;
};

export const SectionTableHeaderHTML = `
  <tr>
    <th>순서</th>
    <th>이름</th>
    <th>설정</th>
  </tr>
`;

export const createSectionTableRowsHTML = sections => {
  return sections.reduce((html, station, idx) => {
    html += TableRowHTML(idx, station);
    return html;
  }, ``);
};

const TableRowHTML = (idx, station) => {
  return `
    <tr>
      <td data-index=${idx}>${idx}</td>
      <td data-name=${station}>${station}</td>
      <td><button class=${CLASS.SECTION_DELETE_BUTTON}>노선에서 제거</button></td>
    </tr>
  `;
};
