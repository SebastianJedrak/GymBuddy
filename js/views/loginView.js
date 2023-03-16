import View from "./view.js";

class LoginView extends View {
  _parentElement = document.querySelector(".main-content");
  _backgroundType = "whitish";
  _navigator = false;
  _headerConfig = [false, false, false, false];
  _HTML() {
    return ` 
    <div class="svg-login-register-container">
    <div class="svg-helloagain"></div>
    <div class="login-register-container">
    <p class="error-login-text hidden">Login and/or password are incorrect. Please try again.</p>
      <form action="" method="GET" class="form-login">
        <input
          type="text"
          placeholder="Login"
          class="input login-login"
        /><input
          type="password"
          placeholder="Password"
          class="input login-password"
        />
        <button class="btn btn-100 btn-navy login-submit-btn">Login</button>
      </form>
      <p class="login-or"><b>or</b></p>
      <button class="btn btn-100 btn-orange btn-register">Registration</button>
      <p class="login-footer">All data will be stored only locally. Any information about you will not be sent to external server.  
      Application created by Sebastian Jędrak for portfolio purposes.</p>
    </div> </div>
   `;
  }
  submitAction(handler) {
    document
      .querySelector(".login-submit-btn")
      .addEventListener("click", (e) => {
        e.preventDefault();
        handler();
      });
  }

  registerBtnListener(handler) {
    document.querySelector(".btn-register").addEventListener("click", handler);
  }
}

export default new LoginView();
