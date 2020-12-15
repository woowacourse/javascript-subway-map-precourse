import Header from "./Header.js";

export default function App($app) {
  this.$app = $app;

  this.Header = new Header({ $target: $app });
}
