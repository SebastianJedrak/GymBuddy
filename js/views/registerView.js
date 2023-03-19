import View from "./view.js";

class RegisterView extends View {
  _parentElement = document.querySelector(".main-content");
  _backgroundType = "gradient";
  _navigator = false;
  _headerConfig = [false, true, false, false];
  _HTML() {
    return `<h1 class="reg-header">Welcome!</h1>
    <p class="reg-paragraph">
      I am GymBuddy, your new favorite workout app. My
      purpose is to help you achieve your fitness goals. I can randomly generate simple workout plans so you will never get bored. I will be keeping your progress and customize your routine. I believe that you and me can achieve great thing together!
    </p>
    <h4 class="reg-header-h4">
    Tell me something about yourself and let's get started!
    </h4>
    <form action="" class="login-register-container-register">
      <input
        type="text"
        placeholder="Login"
        class="input reg-login"
        data-placeholder = "Login"
      /><input
        type="text"
        placeholder="Password"
        class="input reg-password"
        data-placeholder = "Password"
      /><input
        type="number"
        placeholder="Height cm"
        class="input reg-height"
        data-placeholder = "Height cm"
      /><input
        type="number"
        placeholder="Weight kg"
        class="input reg-weight"
        data-placeholder = "Weight kg"
      />
      <div class="radial-container">
      <span><b>Gender:</b></span>
<label><input type="radio" name="gender" class="radio" value="man" checked/>Man</label>
<label><input type="radio" name="gender" class="radio" value="woman"/>Woman</label>
</div>
<div class="radial-container">
<span><b>Experience:</b></span>
<label><input type="radio" name="experience" class="radio radio-exp" value="low" checked/>Beginner</label>
<label><input type="radio" name="experience" class="radio radio-exp" value="high"/>Mid</label>
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
      handler();
    });
  }
}

export default new RegisterView();
