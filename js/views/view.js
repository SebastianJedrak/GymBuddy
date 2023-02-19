export default class View {
  render() {
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", this._renderHTML);
  }

  _clear() {
    this._parentElement.textContent = "";
  }
}
