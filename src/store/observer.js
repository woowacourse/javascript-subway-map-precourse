class Observer {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    if (typeof listener === "function") {
      this.listeners.push(listener);
    }
  }

  notify() {
    this.listeners.forEach(func => func());
  }
}

export default Observer;
