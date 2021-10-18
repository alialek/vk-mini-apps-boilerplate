import React from "react";
import ReactDOM from "react-dom";
import { initApp, isIntroViewed } from "./api/vk/index";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers.js";
import { RouterContext } from "@happysanta/router";
import { router } from "./router/index.js";
import AppWithEpic from "./AppWithEpic";
import App from "./App";

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./store/reducers", () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
};
export const store = configureStore();

initApp();

isIntroViewed();
const render = (Component) => {
  return ReactDOM.render(
    <RouterContext.Provider value={router}>
      <Provider store={store}>
        <Component />
      </Provider>
    </RouterContext.Provider>,
    document.getElementById("root"),
  );
};

const isEpicEnabled = true;
render(isEpicEnabled ? AppWithEpic : App);
if (module.hot && isEpicEnabled) {
  module.hot.accept("./AppWithEpic.js", () => {
    const NextApp = require("./AppWithEpic.js").default;
    render(NextApp);
  });
} else if (module.hot && !isEpicEnabled) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(NextApp);
  });
}
// if (process.env.NODE_ENV === 'development')
// import('./eruda').then(({ default: eruda }) => {}); //runtime download
