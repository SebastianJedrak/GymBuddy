class NavigatorView {
  _renderHTML = `        <ul class="navigation">
  <li class="nav-tile nav-tile-user">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 48 48"
    >
      <g class="nc-icon-wrapper" fill="#fcf8f3">
        <path
          fill="#fcf8f3"
          d="M30,29H18c-7.168,0-13,5.832-13,13v2c0,0.435,0.281,0.82,0.695,0.953 C5.957,45.036,12.229,47,24,47s18.043-1.964,18.305-2.047C42.719,44.82,43,44.435,43,44v-2C43,34.832,37.168,29,30,29z"
        ></path>
        <path
          data-color="color-2"
          d="M24,25c6.195,0,11-6.988,11-13c0-6.065-4.935-11-11-11S13,5.935,13,12C13,18.012,17.805,25,24,25z"
        ></path>
      </g>
    </svg>
  </li>
  <li class="nav-tile nav-tile-home" >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 48 48"
    >
      <g class="nc-icon-wrapper" fill="#212121">
        <path
          d="M39.127,25.229c-6.8-3.569-17.878.679-21.052,4.439-.586-1.509-3.818-4.935-4.561-8.218A41.849,41.849,0,0,1,13,14a5.713,5.713,0,0,0,2.4.168c.974-.245,3.552-1.516,4.281-2.734A2.406,2.406,0,0,0,19.2,8.2c.394-.325,1.45-3.861.046-5S14.834,2,12.984,2C9.206,2,5.708,10.932,3.615,21.545,1.634,31.594,4.932,41.015,6.543,42.656c2.351,2.394,8.107,2.434,10.831,2.085,1.651.826,5.44,1.371,10.691,1.239,6.615-.165,11.545-2.429,13.115-3.565C46.268,38.729,46.927,30.265,39.127,25.229Zm-1.5,9.639-.039.028c-1.657,1.2-6.2,2.646-10.492,2.646a13.963,13.963,0,0,1-4.236-.59,1,1,0,0,1,.614-1.9c4.454,1.434,11.257-.551,12.938-1.773a1,1,0,0,1,1.215,1.589Z"
          fill="#fcf8f3"
        ></path>
      </g>
    </svg>
  </li>
  <li class="nav-tile nav-tile-history" >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <g fill="none" class="nc-icon-wrapper">
        <path
          d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm1.65 7.35L16.5 17.2V14h1v2.79l1.85 1.85-.7.71zM18 3h-3.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H6V5h2v3h8V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2zm-6 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
          fill="#fcf8f3"
        ></path>
      </g>
    </svg>
  </li>
</ul>`;
  _parentElement = document.querySelector("nav");

  navigatorRender() {
    this._parentElement.insertAdjacentHTML("afterbegin", this._renderHTML);
  }

  userListener(handler) {
    document.querySelector(".nav-tile-user").addEventListener("click", handler);
  }
  homeListener(handler) {
    document.querySelector(".nav-tile-home").addEventListener("click", handler);
  }
  historyListener(handler) {
    document
      .querySelector(".nav-tile-history")
      .addEventListener("click", handler);
  }
}

export default new NavigatorView();
