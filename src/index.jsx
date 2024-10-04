import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import ControlPanel from "./components/controlPanel.js";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", height: "100vh", background: "red" }}>
        <ControlPanel />
      </div>
      <div style={{ width: "80%", height: "100vh", margin: "0 auto" }}>
        <Canvas
          shadows
          camera={{
            fov: 75,
            near: 0.1,
            far: 200,
            position: [10, 4, 4],
          }}
        >
          <Experience />
        </Canvas>
      </div>
    </div>
  </Provider>
);
