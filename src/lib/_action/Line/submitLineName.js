import { LINE_NAME_INPUT } from "../../common/IdAndClassNames.js";
import LineNameInputValidation from "../../controllers/line/lineNameInputValidation.js";
// add save func from store

export default (lineName) => {
  const $inputForm = document.querySelector(LINE_NAME_INPUT);
  const checkInput = new LineNameInputValidation(lineName);
  console.log(lineName);
  return new Promise((resolve, reject) => {
    if (checkInput.getInputResult().ok) {
      $inputForm.disabled = true; // 성공 시 input disable 시키고 아래 노선 입력
      resolve(console.log("이제 역들 선택하고 최종 등록하자."));
    } else {
      $inputForm.value = "";
      reject(alert(checkInput.getInputResult().message));
    }
  });
};

// 성공 시 상행 종점, 하행 종점 선택 컨테이너 노출
// 그거까지 다 추가되어야 노선이 추가됨!
