export const createOptionTemplate = array => {
  let template = '';
  array.forEach(
    element => (template += `<option value="${element}">${element}</option>`)
  );

  return template;
};
