const Function = function () {
  this.generateArrayFromString = (string, separator) => string.split(separator);

  this.generateArrayFilledByObjectsFromString = (string) => {
    const lineArray = this.generateArrayFromString(string, "},");
    return lineArray.map((line, index) => {
      const object = index !== lineArray.length - 1 ? line + "}" : line;
      return JSON.parse(object);
    });
  };
};
export const { generateArrayFilledByObjectsFromString } = new Function();
