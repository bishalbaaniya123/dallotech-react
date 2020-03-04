export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return {ok: true}
}

export function getItem(key) {
  if(localStorage.getItem(key)){
    return JSON.parse(localStorage.getItem(key));
  } else {
    return {ok: false}
  }
}
