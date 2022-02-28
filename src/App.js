// import logo from "./logo.svg";
import "./App.css";
import { Switch, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Feed from "./components/Feed/Feed";
import { useState } from "react";
import Logout from "./components/Logout/Logout";

function App() {
  const [login, setLogin] = useState(true); // if user should login or register
  const [isAuth, setIsAuth] = useState(false); // to check if user is authenticated
  const [token, setToken] = useState(""); // current token
  const [feed, setFeed] = useState(false); // enable the feed
  const [list, setList] = useState([]);
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
  const onChangeFeed = (feed) => {
    setFeed(feed);
  };

  const onChangeList = (list) => {
    setList([]);
  };
  const count = 6;
  const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
  const onGetData = () => {
    fetch(fakeDataUrl)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setList(res.results);
        console.log(list);
      });
  };

  return (
    <div className="App">
      {isAuth && (
        <Logout
          onChangeIsAuth={onChangeIsAuth}
          onChangeToken={onChangeToken}
          onChangeFeed={onChangeFeed}
          onChangeList={onChangeList}
        />
      )}
      {login && !isAuth && (
        <Login
          onSuccesfulLogin={onChangeIsAuth}
          onChangeToken={onChangeToken}
          onChangeFeed={onChangeFeed}
          onGetData={onGetData}
        />
      )}
      {!login && !isAuth && <Register />}
      {!isAuth && <Switch defaultChecked onChange={onChange} />}
      {feed && <Feed data={list} />}

      {feed && (
        <Button
          type="primary"
          shape="round"
          onClick={onGetData}
          icon={<DownloadOutlined />}
        >
          Change Data
        </Button>
      )}
    </div>
  );
}

export default App;
