export function isSpecialCharacter(inputValue) {
  const rSpecialCharacter = /[^가-힣ㄱ-하-ㅣ]/;
  return rSpecialCharacter.test(inputValue);
}