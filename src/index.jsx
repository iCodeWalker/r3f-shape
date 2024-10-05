import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";

import "./assets/style/controlPanel.css";
import LeftPanel from "./panels/leftPanel/sizePanel.js";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <div className="root_container">
      <div className="control_panel_container">
        <LeftPanel />
      </div>
      <div className="canvas_container">
        <Canvas
          shadows
          camera={{
            fov: 75,
            near: 0.1,
            far: 200,
            position: [8, 3, 3],
          }}
        >
          <Experience />
        </Canvas>
      </div>
    </div>
  </Provider>
);
