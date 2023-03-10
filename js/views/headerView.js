class HeaderView {
  /**
   * 
   * @param {header text, false for not display header} header 
   * @param {display back button} back 
   * @param {dsplay tutorial button} tutorial 
   * @param {dsplay logout button} logout 
   */
  headerRender(header, back, tutorial, logout) {
    const headerText = `<header class="header">           <h2 class="header-text">${header}</h2>
    </header>`;
    const containerButtons = `<div class="header-buttons"> </div>`;
    const backBtn = `<div class="back-button header-buttons-svg"></div>`;
    const tutorialBtn = `<div class="tutorial-button header-buttons-svg"></div>`;
    const logoutBtn = `<div class="logout-button header-buttons-svg"></div>`
    document.querySelector(".header-container").textContent = "";
    if (header)
      document
        .querySelector(".header-container")
        .insertAdjacentHTML("afterbegin", headerText);
    if ((back || tutorial || logout) && header)
      document
        .querySelector(".header")
        .insertAdjacentHTML("afterbegin", containerButtons);
    if ((back || tutorial || logout) && !header)
      document
        .querySelector(".header-container")
        .insertAdjacentHTML("afterbegin", containerButtons);
    if (back)
      document
        .querySelector(".header-buttons")
        .insertAdjacentHTML("afterbegin", backBtn);
    if (tutorial)
      document
        .querySelector(".header-buttons")
        .insertAdjacentHTML("beforeend", tutorialBtn);
        if (logout)
      document
        .querySelector(".header-buttons")
        .insertAdjacentHTML("beforeend", logoutBtn);
  }
}

export default new HeaderView();
