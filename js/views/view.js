export default class View {
  renderHTML() {
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", this._renderHTML);
  }

  _clear() {
    this._parentElement.textContent = "";
  }
}
