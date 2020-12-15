const getSelectorOptionTemplate = (option) => {
  return `<option value=${option}>${option}</option>`;
};

export const getSelectorOptionsTemplate = (options) => {
  let selectorOptionsTemplate = '';
  options.forEach((option) => {
    selectorOptionsTemplate += getSelectorOptionTemplate(option);
  });

  return selectorOptionsTemplate;
};

export default {
  getSelectorOptionsTemplate,
};
