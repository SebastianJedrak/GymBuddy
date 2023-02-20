class HeaderView {
  _renderNav = ``;
  _renderContainer = ``;
  _renderBack = ``;
  _renderTutorial = ``;

  headerRender(header, back, tutorial) {
    if (header)
      document
        .querySelector(".header-container")
        .insertAdjacentHTML("afterbegin", this._renderNav);
    if (back || tutorial)
      document
        .querySelector(".header-container")
        .insertAdjacentHTML("afterbegin", this._renderNav);
    if (back)
      document
        .querySelector(".header-buttons")
        .insertAdjacentHTML("afterbegin", this._renderBack);
    if (tutorial)
      document
        .querySelector(".header-buttons")
        .insertAdjacentHTML("afterbegin", this._renderTutorial);
  }
}

export default new HeaderView();
