import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/actions/authenticationAction.js";

const ControlPanel = () => {
  const dispatch = useDispatch();

  const authentication = useSelector(
    (state) => state.rootReducer.authenticationReducer
  );

  console.log(authentication, "ControlPanel");
  return <button onClick={() => dispatch(signIn(true))}>Click Me</button>;
};
export default ControlPanel;
