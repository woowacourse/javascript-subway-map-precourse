export const ELEMENT_INFO = {
  navigator: [
    {
      text: "역 관리",
      id: "station-manager-button",
    },
    {
      text: "노선 관리",
      id: "line-manager-button",
    },
    {
      text: "구간 관리",
      id: "section-manager-button",
    },
    {
      text: "지하철 노선도 출력",
      id: "map-print-manager-button",
    },
  ],
  stationNameInput: {
    text: "역 이름",
    id: "station-name-input",
  },
  stationNameSubmit: {
    text: "역 추가",
    id: "station-add-button",
  },
  stationDeleteButton: {
    text: "삭제",
    className: "station-delete-button",
  },
};

export const ERROR_MESSAGE = {
  getItem: "⚠ 데이터를 가져올 수 없습니다.",
  setItem: "⚠ 데이터를 저장하지 못했습니다.",
};

export const STORAGE_KEY = {
  station: "station",
  line: "line",
};
