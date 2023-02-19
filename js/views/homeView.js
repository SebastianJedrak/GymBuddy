import { clear } from "../helpers.js";

class homeView {
  _parentElement = document.querySelector(".main-content");
  _renderHTML = `<div class="workout-parameters-container">
  <h3>Body part</h3>
  <ul class="workout-parameters">
    <li class="btn btn-33 btn-white"><span>Lower</span></li>
    <li class="btn btn-33 btn-orange"><span>Full</span></li>
    <li class="btn btn-33 btn-white"><span>Upper</span></li>
  </ul>
  </div>
  <div class="workout-parameters-container">
  <h3>Type</h3>
  <ul class="workout-parameters">
    <li class="btn btn-33 btn-white"><span>Endurance</span></li>
    <li class="btn btn-33 btn-white"><span>Balanced</span></li>
    <li class="btn btn-33 btn-orange"><span>Strength</span></li>
  </ul>
  </div>
  <div class="workout-parameters-container">
  <h3>Duration</h3>
  <ul class="workout-parameters">
    <li class="btn btn-33 btn-orange"><span>Short</span></li>
    <li class="btn btn-33 btn-white"><span>Medium</span></li>
    <li class="btn btn-33 btn-white"><span>Long</span></li>
  </ul>
  </div>
  <div class="start-container">
  <div class="start-cloud"></div>
  <div class="start-button"></div>
  </div>`;

  renderHome() {
    clear(this._parentElement);
    this._parentElement.insertAdjacentHTML("afterbegin", this._renderHTML);
  }
}

export default new homeView();
