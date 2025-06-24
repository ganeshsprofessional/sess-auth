import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import configureStore from "../store/store";
import { Provider } from "react-redux";
let preloadedState = {};
const store = configureStore(preloadedState);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {" "}
    <App />
  </Provider>
);

window.getState = store.getState;
