export default class SubwayLine {
  constructor(name, upTerminus, downTerminus) {
    this.name = name;
    this.line = [upTerminus, downTerminus];
  }
}
