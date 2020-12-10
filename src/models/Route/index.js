import { construct } from 'core-js/fn/reflect';

export default class Route {
  constructor(routeObj) {
    this.name = routeObj.name;
  }
}
