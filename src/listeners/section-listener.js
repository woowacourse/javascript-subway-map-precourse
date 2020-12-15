import {SECTION} from '../constants.js';
import {
  handleRegisterAndResultSection, handleAddSection,
} from '../handlers/section-handler.js';

export default class SectionListener {
  constructor(subwaySection) {
    this.subwaySection = subwaySection;

    this.addListenerToSectionChoice();
    this.addListenerToLineRegister();
    this.addListenerToSectionResult();
  }

  addListenerToSectionChoice() {
    const choiceDiv = document.getElementById(SECTION.DIV.CHOICE.ID);

    choiceDiv.addEventListener('click', (event) => {
      if (event.target.className === SECTION.BUTTON.LINE.CLASS) {
        return handleRegisterAndResultSection(this.subwaySection, event.target);
      }
    });
  }

  addListenerToLineRegister() {
    const registerDiv = document.getElementById(SECTION.DIV.REGISTER.ID);

    registerDiv.addEventListener('click', (event) => {
      if (event.target.id === SECTION.BUTTON.ADD.ID) {
        return handleAddSection(this.subwaySection);
      }
    });
  }
}
