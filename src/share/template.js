export const stationTableTemplate = (stationName, index, buttonClass) => `
  <tr data-name="${stationName}" data-index="${index}">
    <td>${stationName}</td>
    <td><button class="${buttonClass}" data-index="${index}">삭제</button></td>
  </tr>
`;

export const lineTableTemplate = (data) => {
  const { name, startStation, endStation, index, buttonClass } = data;
  return `
  <tr data-name="${name}" data-startStation="${startStation}" data-endStation="${endStation}" data-index="${index}">
    <td>${name}</td>
    <td>${startStation}</td>
    <td>${endStation}</td>
    <td><button class="${buttonClass}" data-index="${index}">삭제</button></td>
  </tr>
  `;
};

export const sectionDetailTableTemplate = (data) => {
  const { index, name, buttonClass } = data;
  return `
  <tr data-name="${name}" data-index="${index}">
    <td>${index}</td>
    <td>${name}</td>
    <td><button class="${buttonClass}" data-index="${index}">노선에서 삭제</button></td>
  </tr>
  `;
};

export const optionTemplate = (station) =>
  `<option value="${station}">${station}</option>`;
