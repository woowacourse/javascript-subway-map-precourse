import Header from "./Header.js";
import Navigator from "./Navigator.js";

export default function App($app) {
  this.$app = $app;

  this.header = new Header({ $target: $app });
  this.navigator = new Navigator({ $target: $app });
}
