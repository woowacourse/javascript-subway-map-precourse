export function loadData(key) {
  const datas = localStorage.getItem(key);
  return datas ? JSON.parse(datas) : [];
}

export function saveData(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}
