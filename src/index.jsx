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
            near: 0.01,
            far: 500,
            position: [15.188620523312036, 10, 5.601433195040627],
            // x: 14.51858152476826, y: 8.549395477302165, z: 21.407729872222447
          }}
        >
          <Experience />
        </Canvas>
      </div>
    </div>
  </Provider>
);
