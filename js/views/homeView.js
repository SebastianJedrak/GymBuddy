import View from "./view.js";

class HomeView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = true;
  _backgroundType = "gradient";
  _renderHTML = `<div class="workout-parameters-container">
  <h3 class="workout-parameters-text">Body part</h3>
  <ul class="workout-parameters part-parameters">
    <li data-part="lower"><button class="btn btn-33 btn-white" >Lower</button></li>
    <li data-part="full"><button class="btn btn-33 btn-orange" >Full</button></li>
    <li data-part="upper"><button class="btn btn-33 btn-white" >Upper</button></li>
  </ul>
  </div>
  <div class="workout-parameters-container">
  <h3 class="workout-parameters-text">Type</h3>
  <ul class="workout-parameters type-parameters">
  <li data-type="endurance"><button class="btn btn-33 btn-white" >Endurance</button></li>
  <li data-type="balanced"><button class="btn btn-33 btn-white" >Balanced</button></li>
  <li data-type="strength"><button class="btn btn-33 btn-orange" >Strength</button></li>
  </ul>
  </div>
  <div class="workout-parameters-container">
  <h3 class="workout-parameters-text">Duration</h3>
  <ul class="workout-parameters duration-parameters">
  <li data-duration="short"><button class="btn btn-33 btn-orange" >Short</button></li>
  <li data-duration="medium"><button class="btn btn-33 btn-white" >Medium</button></li>
  <li data-duration="long"><button class="btn btn-33 btn-white" >Long</button></li>
  </ul>
  </div>
  <div class="start-container">
  <div class="start-cloud"></div>
  <div class="start-button"></div>
  </div>`;
  _headerConfig = [false, false, true];

  startListener(handler) {
    [...document.querySelector(".start-container").children].forEach(
      (element) => element.addEventListener("click", handler)
    );
  }

  partParameterListener(handler) {
    [...document.querySelector(".part-parameters").children].forEach(
      (parameter) => parameter.addEventListener("click", handler)
    );
  }

  typeParameterListener(handler) {
    [...document.querySelector(".type-parameters").children].forEach(
      (parameter) => parameter.addEventListener("click", handler)
    );
  }

  durationParameterListener(handler) {
    [...document.querySelector(".duration-parameters").children].forEach(
      (parameter) => parameter.addEventListener("click", handler)
    );
  }
}

export default new HomeView();
