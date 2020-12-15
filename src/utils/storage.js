export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadData = (key) => {
  const data = localStorage.getItem(key);
  data ? JSON.parse(data) : [];
};
