export default function Station(name) {
  this.name = name;
  this.next = null;
  this.isIncluded = null;
  this.addIncludedLine = (lineName) => {
    this.isIncluded = lineName;
  };
}
