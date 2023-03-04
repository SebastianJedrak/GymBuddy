import View from "./view.js";

class SpinnerView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = false;
  _backgroundType = "whitish";
  _headerConfig = [false, false, false];

  _HTML() {
    return `        <div class="spinner-wrapper">
    <div class="spinner-logo"></div>
    <div class="spinner-circle"></div>
  </div>`;
  }

  async renderSpinner() {
    this._clear();
    this._backgroundRender();
    this._parentElement.insertAdjacentHTML("afterbegin", this._HTML());
  }
}

export default new SpinnerView();
