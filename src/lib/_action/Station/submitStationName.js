import StationNameInputValidation from "../../controllers/station/stationNameInputValidation.js";

export default (inputValue) => {
  const checkInput = new StationNameInputValidation(inputValue);
  console.log(checkInput);
  return new Promise((resolve, reject) => {
    if (checkInput.getInputResult().ok) {
      resolve(console.log("성공적으로 입력받았습니다. 스토리지에 저장합니다."));
    } else {
      reject(alert(checkInput.getInputResult().message));
    }
  });
};
