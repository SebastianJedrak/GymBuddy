import View from "./view.js";

class RegisterView extends View {
  _parentElement = document.querySelector(".main-content");
  _backgroundType = "gradient";
  _navigator = false;
  _headerConfig = [false, true, false, false];
  _HTML() {
    return `<h1 class="reg-header">Welcome!</h1>
    <p class="reg-paragraph">
      Hello my friend. I am GymBuddy, your new favorite workout app. My
      purpose is to help you achieve your fitness goals. With my random
      generated workout plans you will never get bored. Additional, I will
      be keeping your progress and adjust your routine accordingly. I
      believe that you and me can achieve great things together!
    </p>
    <h4 class="reg-header-h4">
      Please, give me some some basic information about yourself and let's
      get started.
    </h4>
    <form action="" class="login-register-container">
      <input
        type="text"
        placeholder="Login"
        class="input reg-login"
      /><input
        type="text"
        placeholder="Password"
        class="input reg-password"
      /><input
        type="number"
        placeholder="Height cm"
        class="input reg-height"
      /><input
        type="number"
        placeholder="Weight kg"
        class="input reg-weight"
      />
      <div class="radial-container">
      <span><b>Gender:</b></span>
<label><input type="radio" name="gender" class="radio" value="Man" checked/>Man</label>
<label><input type="radio" name="gender" class="radio" value="Woman"/>Woman</label>
</div>
<div class="radial-container">
<span><b>Experience:</b></span>
<label><input type="radio" name="experience" class="radio radio-exp" value="beginner" checked/>Beginner</label>
<label><input type="radio" name="experience" class="radio radio-exp" value="intermediate"/>Intermediate</label>
</div>
      <button class="btn btn-100 btn-navy reg-btn-submit">Start!</button>
    </form>`;
  }

  backBtnListener(handler) {
    document.querySelector(".back-button").addEventListener("click", handler);
  }

  regSubmitAction(handler) {
    document.querySelector(".reg-btn-submit").addEventListener("click", (e) => {
      e.preventDefault();
      handler()
    });
  }
}

export default new RegisterView();
