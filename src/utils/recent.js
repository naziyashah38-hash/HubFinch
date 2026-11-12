const KEY = "hubfinch:recent";
const MAX = 5;

export function getRecent() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function addRecent(username) {
  try {
    const next = [username, ...getRecent().filter((u) => u.toLowerCase() !== username.toLowerCase())];
    localStorage.setItem(KEY, JSON.stringify(next.slice(0, MAX)));
  } catch {}
}

export function clearRecent() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}