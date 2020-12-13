const rEmpty = /[\s]/g;
const rWord = /[^0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;

export default (word) => {
  if (rEmpty.test(word)) {
    window.alert("공백을 제거해 주세요.");
    return false;
  }

  if (rWord.test(word)) {
    window.alert("한글, 영어, 숫자로만 구성된 단어만 입력 가능합니다.");
    return false;
  }

  return true;
};
