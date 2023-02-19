import View from "./view.js";

class UserView extends View {
  _parentElement = document.querySelector(".main-content");
  _backgroundType = "whitish";
  _renderHTML = `user`;
}

export default new UserView();
