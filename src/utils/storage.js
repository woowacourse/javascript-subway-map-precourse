export function save(key, object) {
  localStorage.setItem(key, JSON.stringify(object));
}

export function load(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
