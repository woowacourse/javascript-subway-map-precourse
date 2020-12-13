export default function checkLocalStorageItem() {
  if (localStorage.stations === undefined) {
    localStorage.stations = JSON.stringify([
      "인천",
      "동인천",
      "도원",
      "소요산",
      "사당",
      "시청",
      "신도림",
      "대화",
      "오금",
      "오이도",
      "당고개",
    ]);
  }
  if (localStorage.lines === undefined) {
    localStorage.lines = JSON.stringify([
      { name: "1호선", sections: ["인천", "소요산"] },
      { name: "2호선", sections: ["시청", "신도림"] },
      { name: "3호선", sections: ["대화", "오금"] },
    ]);
  }
}
