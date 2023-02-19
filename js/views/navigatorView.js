class NavigatorView {
  _renderHTML = ``;
  _parentElement = document.querySelector("nav");

  navigatorRender() {
    this._parentElement.insertAdjacentHTML("afterbegin", this._renderHTML);
  }
}

export default new NavigatorView();
