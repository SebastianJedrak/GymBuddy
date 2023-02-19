import View from "./view.js";

class HistoryView extends View {
  _parentElement = document.querySelector(".main-content");
  _renderHTML = `history`;
  renderHistory() {
    this._clear();
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      "<span>history</span>"
    );
  }
}

export default new HistoryView();
