const Utils = function () {
  this.getLocalStorageData = () => {
    const { stations, lines } = window.localStorage;
    return [stations, lines];
  };
};

export const { getLocalStorageData } = new Utils();
