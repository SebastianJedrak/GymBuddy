import { clear } from "../helpers.js";

const main = document.querySelector(".main-content");

class userView {
  renderUser() {
    clear(main);
    main.insertAdjacentHTML("afterbegin", "<span>user</span>");
  }
}

export default new userView();
