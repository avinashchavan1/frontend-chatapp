// import logo from "./logo.svg";
import "./App.css";
import { Switch } from "antd";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useState } from "react";

function App() {
  // const state = {
  //   isLogin: true,
  //   isRegister: true,
  // };

  const [login, setLogin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");
  const [feed, setFeed] = useState(false);
  function onChange(checked) {
    console.log(`switch to ${checked}`);
    setLogin(!login);
  }
  const onChangeIsAuth = (authStatus) => {
    setIsAuth(authStatus);
  };
  const onChangeToken = (token) => {
    setToken(token);
  };
  return (
    <div className="App">
      {login && !isAuth && (
        <Login
          onSuccesfulLogin={onChangeIsAuth}
          onChangeToken={onChangeToken}
        />
      )}
      {!login && !isAuth && <Register />}
      {!isAuth && <Switch defaultChecked onChange={onChange} />}
    </div>
  );
}

export default App;
