import {getLocalStorage} from './local-storage.js';

export const isInputValid = (value) => {
  const exValue = getLocalStorage('station');
  if (value.length < 2) {
    return alert('2글자 이상으로 입력해주세요.');
  }
  if (value.match(/[^가-힣]/)) {
    return alert('띄어쓰기 없이 한글만 입력해주세요.');
  }
  if (exValue && exValue.includes(value)) {
    return alert('중복된 역이 존재합니다.');
  }

  return true;
};
