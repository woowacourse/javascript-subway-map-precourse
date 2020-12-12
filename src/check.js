export function isSpecialCharacter(inputValue) {
  const rSpecialCharacter = /[^가-힣ㄱ-하-ㅣ0-9]/;
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

export function isRegistered(stationName) {
  const stationNameValue = localStorage.getItem(stationName)
  return (stationNameValue === 'false')
}