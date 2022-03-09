import { Form, Input, Button, Avatar, message } from "antd";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import "./Logout.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Logout = (props) => {
  const history = useHistory();

  const [user, setUser] = useState("");
  const graphqlQueryUser = gql`
    query User {
      user {
        name
      }
    }
  `;
  let dataUser;
  const [Getuser, {}] = useLazyQuery(graphqlQueryUser);
  useEffect(() => {
    Getuser()
      .then((res) => setUser(res.data.user.name))
      .catch((err) => console.log(err));
  }, []);

  console.log(dataUser);
  const onLogout = () => {
    props.onChangeIsAuth(false);
    props.onChangeToken("");
    props.onChangeFeed(false);
    props.onChangeList([]);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    message.success({ content: "Logged out" });
    history.push("/login");
  };
  return (
    <div id="logout">
      {/* <Avatar >USER</Avatar> */}
      {user}.
      <Button
        type="link"
        icon={<PoweroffOutlined />}
        onClick={onLogout}
        danger
      ></Button>
    </div>
  );
};

export default Logout;
