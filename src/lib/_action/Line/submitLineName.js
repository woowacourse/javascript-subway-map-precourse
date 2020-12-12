import {LINE_NAME_INPUT} from "../../common/IdAndClassNames.js";
//add input validation class
//add save func from store

export default (inputValue) => {
  const $inputForm = document.querySelector(LINE_NAME_INPUT);
  console.log(inputValue);


  return new Promise((resolve, reject) => {
    $inputForm.value = "";

  })
};
