export const NoneLineMapHTML = `
  <p>노선이 존재하지 않습니다.</p>
`;

export const createLineListHTML = lines => {
  return lines.reduce((html, line) => {
    html += ListHTML(line);
    return html;
  }, ``);
};

const ListHTML = line => {
  return (
    line.sections.reduce((html, station) => {
      html += `<li>${station}</li>`;
      return html;
    }, `<p>${line.name}</p><ul>`) + `</ul>`
  );
};
