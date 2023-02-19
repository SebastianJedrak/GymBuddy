import NavigatorView from "./navigatorView.js";

export default class View {
  _globalContainer = document.querySelector(".global-container");
  renderView() {
    this._clear();
    this._backgroundRender();
    this._navigatorRender();
    this._HTMLRender();
  }

  _clear() {
    this._parentElement.textContent = "";
  }

  _HTMLRender() {
    this._parentElement.insertAdjacentHTML("afterbegin", this._renderHTML);
  }

  _backgroundRender() {
    if (this._backgroundType === "gradient") {
      this._globalContainer.classList.remove("BG-whitish");
      this._globalContainer.classList.add("BG-gradient");
    }
    if (this._backgroundType === "whitish") {
      this._globalContainer.classList.remove("BG-gradient");
      this._globalContainer.classList.add("BG-whitish");
    }
  }

  _navigatorRender() {
    if (this._navigator === true)
      document.querySelector("nav").classList.remove("hidden");
    if (this._navigator === false)
      document.querySelector("nav").classList.add("hidden");
  }
}
