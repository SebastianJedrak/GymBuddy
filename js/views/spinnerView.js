import View from "./view.js";

class SpinnerView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = false;
  _backgroundType = "whitish";
  _headerConfig = [false, false, false];

  _HTML() {
    return ``;
  }
}

export default new SpinnerView();
