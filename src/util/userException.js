export default class UserException {
  isValidNameLength(name) {
    return name.length >= 2;
  }

  isDuplicatedName(lists, inputName) {
    return lists.some((element) => element.name === inputName);
  }
}
