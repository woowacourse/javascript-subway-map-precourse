export default class SubwayMapViewModel {
  constructor(subwayMapModel) {
    this.subwayMapModel = subwayMapModel;

    return this.setProxy();
  }

  setProxy() {
    return new Proxy(this, {
      set(target, property, value) {
        if (property === 'test') {
          console.log('call');
        }
      },
    });
  }
}
