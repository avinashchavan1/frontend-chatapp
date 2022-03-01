// import logo from "./logo.svg";
import "./App.css";
import { Switch, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Feed from "./components/Feed/Feed";
import { useEffect, useState } from "react";
import Logout from "./components/Logout/Logout";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

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

  return (
    <ApolloProvider client={client}>
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
          // onGetData={onGetData}
        />
      )}
      {!login && !isAuth && <Register />}
      {!isAuth && <Switch defaultChecked onChange={onChange} />}
      {feed && <Feed data={list} token={token} />}
    </ApolloProvider>
  );
}

export default App;
