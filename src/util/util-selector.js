import { SELECTOR } from '../configuration.js';
import { getLocalStorageAsArray } from './util-local-storage.js';
import { createLabel, createSelect, createOption } from './util-ui.js';

export const appendSelector = (form, key) => {
  const label = createLabel(key, SELECTOR[key].label);
  const itemList = getLocalStorageAsArray(SELECTOR[key].dataLocation);
  const options = itemList.map((item) => createOption(item.name, item.name));
  const selector = createSelect(key, SELECTOR[key].id, options);

  form.append(label);
  form.append(selector);
};
