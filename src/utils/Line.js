export default function Line(id, name) {
  this.id = id;
  this.name = name;
  this.stationIds = [];

  this.setLine = (stationId, index) => {
    if (this.stationIds.includes(stationId)) {
      alert('이미 등록되어 있습니다');
    }
    this.stationIds.splice(index, 0, stationId);
  };
}
