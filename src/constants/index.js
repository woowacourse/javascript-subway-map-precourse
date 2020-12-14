export const WORDS = {
  STATION: {
    INPUT_TITLE: "역 이름",
    INPUT_PLACEHOLDER: "역 이름을 입력해주세요",
    ADD_BUTTON: "역 추가",

    LIST_TITLE: "🚉 지하철 역 목록",
    LIST_COL1: "역 이름",
    LIST_COL2: "설정",
    DELETE_BUTTON: "삭제",
  },
  LINE: {
    VALIDATION: "선",

    INPUT_TITLE: "노선 이름",
    INPUT_PLACEHOLDER: "노선 이름을 입력해주세요",

    START_LABEL: "상행 종점",
    END_LABEL: "하행 종점",

    ADD_BUTTON: "노선 추가",

    LIST_TITLE: "🚉 지하철 노선 목록",
    LIST_COL_ARRAY: ["노선 이름", "상행 종점역", "하행 종점역", "설정"],
    DELETE_BUTTON: "삭제",
  },
  SECTION: {
    CHOICE_TITLE: "구간을 수정할 노선을 선택해주세요.",
    LINE_TITLE: "관리",

    ADD_TITLE: "구간 등록",
    INPUT_PLACEHOLDER: "순서",
    ADD_BUTTON: "등록",
    LIST_COL_ARRAY: ["순서", "이름", "설정"],

    DELETE_BUTTON: "노선에서 제거",
  },
};

export const REFRENCE_STATION_LENGTH = 2;

export const MESSAGE = {
  EMPTY: "공백 입력은 허용되지 않습니다.",
  SHORT: "2자 이상 이름을 입력해주세요.",
  DUPLICATE: "중복된 이름은 허용되지 않습니다.",
  SAME_STATION: "상행선 종점과 하행선 종점은 같을 수 없습니다.",
  WRONG_RANGE: "구간 범위안에서 숫자를 입력해주세요.",
  CONFIRM: "정말로 삭제하시겠습니까 ?",
  LINE_WORD_INCLUDE:
    "어떤 노선인지 끝에 '선' 단어를 포함해주세요 ex)경의중앙선, 1호선",
};

export const KEY = {
  STATION: "station",
  LINE: "line",
  SECTION: "section",
};
