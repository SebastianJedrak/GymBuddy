import { clear } from "../helpers.js";

const main = document.querySelector(".main-content");

class historyView {
  renderHistory() {
    clear(main);
    main.insertAdjacentHTML("afterbegin", "<span>history</span>");
  }
}

export default new historyView();
