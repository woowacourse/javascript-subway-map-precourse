import tabsList from "./tabsList.js";
import { SECTION_TAB_INDEX } from "../../common/constants.js";

const tabTitle = tabsList.map(({ title }) => title);

export const stationLineHelperTexts = (tabIndex) => ({
  inputHelper: `${tabTitle[tabIndex]} 이름`,
  inputPlaceHolder: `${tabTitle[tabIndex]} 이름을 입력해주세요.`,
  addButtonText: `${tabTitle[tabIndex]} 추가`,
  startStation: "상행 종점 ",
  endStation: "하행 종점 ",
});

export const sectionHelperText = {
  title: `${tabTitle[SECTION_TAB_INDEX]}을 수정할 노선을 선택해주세요.`,
  inputHelper: `${tabTitle[SECTION_TAB_INDEX]} 등록`,
  buttonText: "등록",
  inputPlaceHolder: "순서",
};

export const NOT_EXIST_LINE_ERROR_MESSAGE = "현재 등록된 노선이 없습니다.";
