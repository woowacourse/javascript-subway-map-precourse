const isSpecialCharacter = function(inputValue) {
  const rSpecialCharacter = /[^가-힣ㄱ-하-ㅣ0-9]/;
  return rSpecialCharacter.test(inputValue);
}

const isValidLength = function(inputValue) {
  const validLength = 2;
  const inputValueLength = inputValue.length;
  return (inputValueLength >= validLength);
}

const isDuplicated = function(lineName) {
  const lines = JSON.parse(localStorage.getItem("line"));
  let i;
  for (i = 0; i < lines.length; i++) {
    if (lines[i].name === lineName) {
      return true;
    }
  }
}

const isRegisteredStation = function(stationName) {
  const stations = JSON.parse(localStorage.getItem("station"));
  let i;
  for (i = 0; i < stations.length; i++) {
    if (stations[i].name === stationName) {
      return (stations[i].registered !== 0);
    }
  }
}

const isInLine = function(selectInputValue, lineStations) {
  let i;
  for (i = 0; i < lineStations.length; i++) {
    if (lineStations[i] === selectInputValue) {
      return true;
    }
  }
}

const isValidNumber = function(orderInputValue, lineLength) {
  return (lineLength > orderInputValue > 0);
}

const isValidArrayLength = function(key, lineName) {
  const objects = JSON.parse(localStorage.getItem(key));
  const validLength = 2;
  let i;
  for (i = 0; i < objects.length; i++) {
    if (objects[i].name === lineName) {
      return (objects[i].line.length > validLength);
    }
  }
}

const removeData = function(key, dataName) {
  let objects = JSON.parse(localStorage.getItem(key));
  let i;
  for (i = 0; i < objects.length; i++) {
    if (objects[i].name === dataName) {
      const dataIndex = objects.indexOf(objects[i]);
      objects.splice(dataIndex, 1);
      localStorage.setItem(key, JSON.stringify(objects));
    }
  }
}

const removeStation = function(key, stationName, lineName, stationList) {
  let objects = JSON.parse(localStorage.getItem(key));
  let i;
  for (i = 0; i < objects.length; i++) {
    if (objects[i].name === lineName) {
      const dataIndex = objects[i].line.indexOf(stationName);
      objects[i].line.splice(dataIndex, 1);
      localStorage.setItem(key, JSON.stringify(objects));
    }
  }
}

export { 
  isSpecialCharacter, 
  isValidLength, 
  isDuplicated, 
  isRegisteredStation, 
  isInLine, 
  isValidNumber, 
  isValidArrayLength, 
  removeData, 
  removeStation };