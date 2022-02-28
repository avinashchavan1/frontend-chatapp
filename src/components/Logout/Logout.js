import { Form, Input, Button } from "antd";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import "./Logout.css";

const Logout = (props) => {
  const onLogout = () => {
    props.onChangeIsAuth(false);
    props.onChangeToken("");
    props.onChangeFeed(false);
    props.onChangeList([]);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };
  return (
    <Button type="primary" icon={<PoweroffOutlined />} onClick={onLogout}>
      Log out
    </Button>
  );
};

export default Logout;
