export default function Station(id, name) {
  this.id = id;
  this.name = name;
  this.line = [];

  this.setLine = (lineName) => {
    if (this.line.includes(lineName)) {
      alert(`${lineName}에 이미 ${name}역이 포함되어 있습니다.`);
    } else {
      this.line.push(lineName);
    }
  };
}
