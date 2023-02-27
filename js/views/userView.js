import View from "./view.js";

class UserView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = true;
  _backgroundType = "whitish";
  _headerConfig = [`User`, false, false];

  _HTML() {
    return `user`;
  }
}

export default new UserView();
