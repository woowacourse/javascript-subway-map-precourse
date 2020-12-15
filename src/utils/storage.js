export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};
