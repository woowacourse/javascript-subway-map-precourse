import {SECTION, STORAGE} from '../constants.js';
import SectionListener from '../listeners/section-listener.js';
import SubwaySection from '../main/subway-section.js';
import {saveList} from '../main/subway-local-storage.js';
import {
  renderLineChoices, renderSectionRegister,
  renderSectionResult, renderAddSection, renderDeleteSection,
} from '../views/subway-section-view.js';

class SectionHandler {
  handleInitSection() {
    const subwaySection = new SubwaySection();

    renderLineChoices(subwaySection.lineList);

    new SectionListener(subwaySection);
  }

  handleRegisterAndResultSection(subwaySection, target) {
    subwaySection.setCurrentLineName(target.value);

    renderSectionRegister(subwaySection.stationList, target.value);
    renderSectionResult(subwaySection.lineList[target.value]);
  }

  handleAddSection(subwaySection) {
    const station = document.getElementById(SECTION.SELECT.STATION.ID).value;
    const order = document.getElementById(SECTION.INPUT.ORDER.ID).value;

    subwaySection.addSection(station, order, (err, lineList, lineName) => {
      if (err) return alert(err);

      saveList(STORAGE.LINE.KEY, lineList);
      renderAddSection(lineList[lineName][order].name, order);
    });
  }

  handleDeleteSection(subwaySection, target) {
    const targetId = parseInt(target.dataset.sectionId);

    if (!confirm(SECTION.ALERT.DELETE)) return;

    subwaySection.deleteSection(targetId, (err, lineList) => {
      if (err) return alert(err);

      saveList(STORAGE.LINE.KEY, lineList);
      renderDeleteSection(targetId);
    });
  }
}

const sectionHandler = new SectionHandler();

export const {
  handleInitSection,
  handleRegisterAndResultSection,
  handleAddSection,
  handleDeleteSection,
} = sectionHandler;
