import View from "./view.js";

class UserView extends View {
  _parentElement = document.querySelector(".main-content");
  _renderHTML = `user`;
  renderUser() {
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", "<span>user</span>");
  }
}

export default new UserView();
