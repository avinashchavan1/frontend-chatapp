// import logo from "./logo.svg";
import "./App.css";
import { Switch, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Feed from "./components/Feed/Feed";
import { useEffect, useState } from "react";
import Logout from "./components/Logout/Logout";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { useHistory } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Redirect } from "react-router-dom";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const token = localStorage.getItem("token");
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),

  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const history = useHistory();

  const [login, setLogin] = useState(true); // if user should login or register
  const [isAuth, setIsAuth] = useState(false); // to check if user is authenticated
  const [token, setToken] = useState(""); // current token
  const [feed, setFeed] = useState(false); // enable the feed
  const [list, setList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    // const userId = localStorage.getItem("userId");
    const newDate = new Date(Date.parse(expiryDate));
    // newDate.addDays(4);
    const currDate = new Date();
    if (currDate < newDate) {
      console.log("Im");
      setIsAuth(true);
      setFeed(true);
      setToken(token);
      history.push("/feed");
    }
  }, []);

  function onChange(checked) {
    console.log(`switch to ${checked}`);
    setLogin(!login);
  }
  const onChangeIsAuth = (authStatus) => {
    setIsAuth(authStatus);
  };
  const onChangelogin = (login) => {
    setLogin(login);
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

  return (
    <ApolloProvider client={client}>
      <Route path="/" exact>
        <Redirect to="/login"></Redirect>
      </Route>
      <Route path="/login">
        <Login
          onSuccesfulLogin={onChangeIsAuth}
          onChangeToken={onChangeToken}
          onChangeFeed={onChangeFeed}
          // onGetData={onGetData}
          onChangelogin={onChangelogin}
        />
      </Route>
      <Route path="/register">
        <Register
          onChangelogin={onChangelogin}
          onChangeIsAuth={onChangeIsAuth}
          onChangeToken={onChangeToken}
          onChangeFeed={onChangeFeed}
        />
      </Route>
      <Route path="/feed">
        {isAuth && (
          <Logout
            onChangeIsAuth={onChangeIsAuth}
            onChangeToken={onChangeToken}
            onChangeFeed={onChangeFeed}
            onChangeList={onChangeList}
          />
        )}
        {isAuth && <Feed data={list} token={token} />}
      </Route>
    </ApolloProvider>
  );
}

export default App;
