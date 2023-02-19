import View from "./view.js";

class UserView extends View {
  _parentElement = document.querySelector(".main-content");
  _renderHTML = `user`;
}

export default new UserView();
