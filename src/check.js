export function isSpecialCharacter(inputValue) {
  const rSpecialCharacter = /[^가-힣ㄱ-하-ㅣ]/;
  return rSpecialCharacter.test(inputValue);
}

export function isValidLength(inputValue) {
  const validLength = 2;
  const inputValueLength = inputValue.length
  return (inputValueLength >= validLength);
}

export function isDuplicated(inputValue) {
  return (localStorage.getItem(inputValue))
}