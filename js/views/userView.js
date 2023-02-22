import View from "./view.js";

class UserView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = true;
  _backgroundType = "whitish";
  _renderHTML = `user`;
  _headerConfig = [`User`, false, false];
}

export default new UserView();
