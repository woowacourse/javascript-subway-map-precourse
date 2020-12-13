function mapPrintManagerPage(subwayDatas) {
  // let ul = ``;

  // subwayDatas.lines.map((line) => {
  //   ul += `<ul>${line.name}`;

  //   line.stops.map((stop) => {
  //     ul += `<li>${stop}</li>`;
  //   });

  //   ul += "</ul>";
  // });

  // let mapPrintManager = `<div> ${ul} </div>`;

  // return mapPrintManager;

  let Map = ``;

  subwayDatas.lines.map((line) => {
    let insideOfUl = ``;
    line.stops.map((stop) => {
      insideOfUl += `<li style="padding-left: 20px">${stop}</li>`;
    });
    Map += `<ul style="list-style-position: inside">${line.name}${insideOfUl}</ul>`;
  });
  return Map;
}

export default mapPrintManagerPage;
