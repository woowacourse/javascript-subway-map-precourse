const getSectionLineMenuButtonTemplate = (lineName) => {
  return `<button class="section-line-menu-button" data-target-line="${lineName}">${lineName}</button>`;
};

export const getSectionLineMenuButtonsTemplate = (lineNames) => {
  let targetLineSetterButtonsTemplate = '';
  lineNames.forEach((lineName) => {
    targetLineSetterButtonsTemplate += getSectionLineMenuButtonTemplate(
      lineName
    );
  });

  return targetLineSetterButtonsTemplate;
};

export default {
  getSectionLineMenuButtonsTemplate,
};
