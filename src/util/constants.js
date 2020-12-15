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
  lineNameInput: {
    text: "노선 이름",
    id: "line-name-input",
  },
  lineStartStationSelector: {
    text: "상행 종점",
    id: "line-start-station-selector",
  },
  lineEndStationSelector: {
    text: "하행 종점",
    id: "line-end-station-selector",
  },
  lineAddButton: {
    text: "노선 추가",
    id: "line-add-button",
  },
  lineDeleteButton: {
    text: "삭제",
    className: "line-delete-button",
  },
  sectionLineMenuButton: {
    className: "section-line-menu-button",
  },
  sectionStationSelector: {
    id: "section-station-selector",
  },
  sectionOrderInput: {
    text: "순서",
    id: "section-order-input",
  },
  sectionAddButton: {
    text: "등록",
    id: "section-add-button",
  },
  sectionDeleteButton: {
    text: "노선에서 제거",
    className: "section-delete-button",
  },
};

export const STATION_NAME_MIN_LENGTH = 2;
export const LINE_NAME_MIN_LENGTH = 1;

export const ERROR_MESSAGE = {
  getItem: "⚠ 데이터를 가져올 수 없습니다.",
  setItem: "⚠ 데이터를 저장하지 못했습니다.",
  shortStationName: `⚠ ${STATION_NAME_MIN_LENGTH}자 이상의 역 이름을 입력해주세요.`,
  duplicatedStationName: "⚠ 이미 존재하는 역 이름입니다.",
  notPossibleToDeleteStation: "⚠ 노선에 등록된 역은 삭제할 수 없습니다.",
  shortLineName: `⚠ ${LINE_NAME_MIN_LENGTH}자 이상의 노선 이름을 입력해주세요.`,
  duplicatedLineName: "⚠ 이미 존재하는 노선 이름입니다.",
  sameStartAndEndStation: "⚠ 상행 종점역과 하행 종점역은 같을 수 없습니다.",
  notNatureNumberSectionOrder: "⚠ 구간 순서는 소수나 음수가 될 수 없습니다. 자연수를 입력해주세요.",
  overStationsLength: "⚠ 입력된 숫자가 기존 구간의 개수를 넘습니다. 이 노선의 마지막 순서로 구간을 등록합니다.",
  notPossibleToDeleteSection: "⚠ 노선 내에 역의 개수가 2개 이하이면 노선에서 구간을 제거할 수 없습니다.",
};

export const STORAGE_KEY = {
  station: "station",
  line: "line",
};
