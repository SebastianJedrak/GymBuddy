import navigatorView from "./navigatorView.js";
import headerView from "./headerView.js";

export default class View {
  _globalContainer = document.querySelector(".global-container");
  renderView() {
    this._clear();
    headerView.headerRender(...this._headerConfig);
    this._backgroundRender();
    this._HTMLRender();
    this._navigatorRender();
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
    this._clear.call(navigatorView);
    if (this._navigator === true) navigatorView.navigatorRender();
  }
}
