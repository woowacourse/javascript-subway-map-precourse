const LocalStorage = function () {
  this.getLocalStorageData = () => {
    const { stations, lines } = window.localStorage;
    return [stations, lines];
  };
  this.setLocalStorageDataOf = (item, value) => {
    window.localStorage.setItem(item, value);
  };
};
export const {
  getLocalStorageData,
  setLocalStorageDataOf,
} = new LocalStorage();
