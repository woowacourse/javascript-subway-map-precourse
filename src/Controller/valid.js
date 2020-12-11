export const isInputValid = (value, exStation) => {
  if (value.length < 2) {
    return alert('2글자 이상으로 입력해주세요.');
  }
  if (value.match(/[^가-힣]/)) {
    return alert('띄어쓰기 없이 한글만 입력해주세요.');
  }
  if (exStation && exStation.includes(value)) {
    return alert('중복된 역이 존재합니다.');
  }

  return true;
};

export const isLineInputValid = (userLine, exLine) => {
  if (userLine.lineName.length < 2) {
    return alert('2글자 이상으로 입력해주세요.');
  }
  if (userLine.lineName.match(/[^가-힣1-9]/)) {
    return alert('띄어쓰기 없이 한글과 숫자만 입력해주세요.');
  }
  if (exLine && exLine.find((line) => line.lineName === userLine.lineName)) {
    return alert('이미 동일한 노선 이름이 존재합니다.');
  }
  if (userLine.upStream === userLine.downStream) {
    return alert('상행과 하행이 같은 역이 될 수 없습니다.');
  }

  return true;
};
