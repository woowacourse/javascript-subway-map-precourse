export default function Station(name) {
  this.name = name;
  this.next = null;
  this.isIncluded = null;
  this.addIncludedLine = (lineName) => {
    this.isIncluded = lineName;
  };
  this.deleteIncludedLine = (lineName) => {
    const deleteIdx = this.isIncluded.findIndex(
      (line) => line.name === lineName
    );
    this.isIncluded.splice(deleteIdx, 1);
  };
}
