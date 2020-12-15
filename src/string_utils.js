export default class StringUtils {
  removeSpace(inputValue) {
    return inputValue.split(' ').join('');
  }

  getVarName(tagName) {
    let tagParts = this.splitTagName(tagName);
    let varNameParts = this.intoCamelCase(tagParts);

    return varNameParts.join('');
  }

  splitTagName(tagName) {
    return tagName.split('-');
  }

  intoCamelCase(tagParts) {
    let varNameParts = [];

    tagParts.forEach((part) => {
      varNameParts.push(this.capitalizeFirstChar(part, tagParts));
    })

    return varNameParts;
  }

  capitalizeFirstChar(string, tagParts) {
    if (tagParts.indexOf(string) >= 1) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    return string
  }

  getArticleName(tagName) {
    const tagParts = this.splitTagName(tagName);

    return `${tagParts[0]}Article`;
  }
}