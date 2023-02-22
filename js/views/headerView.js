class HeaderView {
  _renderHeader = `<header class="header">           <h2 class="header-text">header</h2>
  </header>`;
  _renderContainer = `<div class="header-buttons"> </div>`;
  _renderBack = `<div class="back-button"></div>`;
  _renderTutorial = `   <div class="tutorial-button"></div>`;

  headerRender(header, back, tutorial) {
    if (header)
      document
        .querySelector(".header-container")
        .insertAdjacentHTML("afterbegin", this._renderHeader);
    if (back || tutorial)
      document
        .querySelector(".header-container")
        .insertAdjacentHTML("afterbegin", this._renderContainer);
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
