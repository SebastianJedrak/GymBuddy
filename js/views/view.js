export default class View {
  _render() {}

  _clear() {
    this._parentElement.textContent = "";
  }
}
