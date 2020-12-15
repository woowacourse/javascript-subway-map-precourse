import Header from "./Header.js";
import Navigator from "./Navigator.js";
import StationManager from "./StationManager.js";

export default function App($app) {
  this.$app = $app;

  this.header = new Header({ $target: this.$app });
  this.navigator = new Navigator({ $target: this.$app });

  this.$main = document.createElement("main");
  this.$app.append(this.$main);

  this.stationManager = new StationManager({
    $target: this.$main,
    isShow: true,
  });
}
