import View from "./view.js";

class HistoryView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = true;
  _backgroundType = "whitish";
  _renderHTML = `history`;
}

export default new HistoryView();
