import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();

  const onFinish = (values) => {
    const key = "updatable";
    message.loading({ content: "Logging you in...", key });
    const graphqlQuery = {
      query: `{
          login(email:"${values.userEmail}",password:"${values.password}"){
            token
            userId
          }
        }`,
    };
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.errors) {
          message.warning({ content: result.errors[0].message, key });

          // console.log(result.errors[0].message);
        } else {
          message.success({ content: "Logged in!", key });

          const token = result.data.login.token;
          const userId = result.data.login.userId;
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          const remainingMilliseconds = 60 * 60 * 1000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem("expiryDate", expiryDate.toISOString());
          console.log(token, userId);
          props.onSuccesfulLogin(true);
          props.onChangeToken(token);
          props.onChangeFeed(true);
          //<Redirect to="/login"></Redirect>
          //   props.onGetData();
          history.push("/feed");
        }
      })
      .catch((err) => {
        const messageText = err.message;
        message.warning({ content: messageText, key });

        console.log(err);
      });
  };

  const changeToRegister = () => {
    props.onChangelogin(false);
    history.push("/register");
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="userEmail"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
      <p
        onClick={changeToRegister}
        style={{ color: "#1890ff", cursor: "pointer" }}
      >
        Not Registered? Register Now!
      </p>
    </Form>
  );
};

export default Login;
