class HeaderView {
  headerRender(header, back, tutorial) {
    const headerText = `<header class="header">           <h2 class="header-text">${header}</h2>
    </header>`;
    const containerButtons = `<div class="header-buttons"> </div>`;
    const backBtn = `<div class="back-button"></div>`;
    const tutorialBtn = `   <div class="tutorial-button"></div>`;
    if (header)
      document
        .querySelector(".header-container")
        .insertAdjacentHTML("afterbegin", headerText);
    if (back || tutorial)
      document
        .querySelector(".header")
        .insertAdjacentHTML("afterbegin", containerButtons);
    if (back)
      document
        .querySelector(".header-buttons")
        .insertAdjacentHTML("afterbegin", backBtn);
    if (tutorial)
      document
        .querySelector(".header-buttons")
        .insertAdjacentHTML("afterbegin", tutorialBtn);
  }
}

export default new HeaderView();
