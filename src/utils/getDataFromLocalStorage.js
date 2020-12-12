const SUB_WAY_INFO = "SUB_WAY_INFO";
export const getDataFromLocalStorage = (subwayInfo) => {
  const dataFromStorage = localStorage.getItem(SUB_WAY_INFO);
  console.log(dataFromStorage);
  if (dataFromStorage !== null) {
    subwayInfo = JSON.parse(dataFromStorage);
  }
};
