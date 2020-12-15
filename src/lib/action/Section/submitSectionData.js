import AddSectionValidation from "../../controllers/section/addSectionValidation.js";
import saveNewSection from "../../store/Section/saveNewSection.js";
import { SECTION_ORDER_INPUT } from "../../common/IdAndClassNames.js";

export default (sectionData) => {
  const $sectionOrderInput = document.querySelector(SECTION_ORDER_INPUT);
  const checkValidSectionInfo = new AddSectionValidation(sectionData);
  const { ok, message } = checkValidSectionInfo.getInputResult();

  return new Promise((resolve, reject) => {
    if (!ok) {
      $sectionOrderInput.focus();
      reject(alert(message));
    } else {
      resolve(saveNewSection(sectionData));
    }
  });
};
