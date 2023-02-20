class HeaderView {
  _parentElement = document.querySelector(".header-container");
  _renderNav = ``;
  _renderBack = ``;
  _renderTutorial = ``;

  headerRender(header, back, tutorial) {
    if (header)
      this._parentElement.insertAdjacentHTML("afterbegin", this._renderNav);
    if (back)
      this._parentElement.insertAdjacentHTML("afterbegin", this._renderBack);
    if (tutorial)
      this._parentElement.insertAdjacentHTML(
        "afterbegin",
        this._renderTutorial
      );
  }
}

export default new HeaderView();
