const Utils = function () {
  this.getLocalStorageData = () => {
    const { stations, lines } = window.localStorage;
    return [stations, lines];
  };
  this.setLocalStorageDataOf = (item, value) => {
    window.localStorage.setItem(item, value);
  };
  this.resultDIV = document.getElementById("result");
};

export const {
  getLocalStorageData,
  setLocalStorageDataOf,
  resultDIV,
} = new Utils();
