import Header from "./Header.js";
import Navigator from "./Navigator.js";
import StationManagement from "./StationManagement.js";

export default function App($app) {
  this.$app = $app;

  this.header = new Header({ $target: this.$app });
  this.navigator = new Navigator({ $target: this.$app });

  this.$main = document.createElement("main");
  this.$app.append(this.$main);

  this.stationManagement = new StationManagement({
    $target: this.$main,
    isShow: true,
  });
}
