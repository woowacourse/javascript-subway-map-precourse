const LocalStorage = function () {
  this.getLocalStorageDataBy = (dataName) => window.localStorage[dataName];

  this.setLocalStorageDataOf = (item, value) => {
    window.localStorage.setItem(item, value);
  };
};
export const {
  getLocalStorageDataBy,
  setLocalStorageDataOf,
} = new LocalStorage();
