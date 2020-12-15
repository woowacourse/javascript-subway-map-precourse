export function saveData(key, object) {
  localStorage.setItem(key, JSON.stringify(object));
}

export function loadData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
