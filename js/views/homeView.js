import View from "./view.js";

class HomeView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = false;
  _backgroundType = "gradient";
  _headerConfig = [false, false, true];

  _HTML() {
    return `
    <dialog class="modal modal-home-tutorial">
    <div class="modal-home-tutorial-content">
      <div class="modal-tutorial-home-parameter">
        <h3>Body part</h3>
        <ul>
          <h4>Choose the body part you want to train.</h4>
          <li>
            By choosing the lower part of the body, you will work such
            muscle groups as quadriceps, hamstrings or glutes.
          </li>
          <li>
            With a full body workout, you will train all muscle groups.
            However, it will not affect the length of the training.
          </li>
          <li>
            An upper body workout will focus on your chest, back, and
            arms.
          </li>
        </ul>
      </div>
      <div class="modal-tutorial-home-parameter">
        <h3>Type</h3>
        <ul>
          <h4>Specify what type of training you want to do.</h4>
          <li>
            With endurance training, you will do fewer sets but more
            repetitions.
          </li>
          <li>
            Strength training will increase the number of sets but
            decrease the number of repetitions.
          </li>
          <li>
            Choose a balanced workout if you don't want to focus solely on
            strength or endurance.
          </li>
        </ul>
      </div>
      <div class="modal-tutorial-home-parameter">
        <h3>Duration</h3>
        <ul>
          <h4>Describe how long your training should last.</h4>
          <li>You should complete a short workout in 30 minutes.</li>
          <li>A medium workout should last about 45 minutes.</li>
          <li>A long workout should not exceed an hour.</li>
        </ul>
      </div>
      </div>
      <div class="btn-close-model-home-tutorial-wrapper">
      <button class="btn btn-50 btn-orange btn-close-model-home-tutorial">OK</button>
    </div>
  </dialog>
    <div class="workout-parameters-container">
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
  <li data-type="balanced"><button class="btn btn-33 btn-orange" >Balanced</button></li>
  <li data-type="strength"><button class="btn btn-33 btn-white" >Strength</button></li>
  </ul>
  </div>
  <div class="workout-parameters-container">
  <h3 class="workout-parameters-text">Duration</h3>
  <ul class="workout-parameters duration-parameters">
  <li data-duration="short"><button class="btn btn-33 btn-white">Short</button></li>
  <li data-duration="medium"><button class="btn btn-33 btn-orange" >Medium</button></li>
  <li data-duration="long"><button class="btn btn-33 btn-white" >Long</button></li>
  </ul>
  </div>
  <div class="start-container">
  <div class="start-cloud"></div>
  <div class="start-button"></div>
  </div>`;
  }

  startWorkoutListener(handler) {
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

  openTutorialModalListener() {
    const modal = document.querySelector(".modal-home-tutorial");
    document
      .querySelector(".tutorial-button")
      .addEventListener("click", function () {
        modal.showModal();
      });
    document
      .querySelector(".btn-close-model-home-tutorial")
      .addEventListener("click", function () {
        modal.close();
      });
  }
}

export default new HomeView();
