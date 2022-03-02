import { Form, Input, Button, message, Breadcrumb } from "antd";
import { UserOutlined, LockOutlined, UserAddOutlined } from "@ant-design/icons";
import "./Register.css";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

const Register = (props) => {
  const graphqlQuery = gql`
    mutation AddUser($userData: UserInputData!) {
      addUser(userData: $userData) {
        name
        id
      }
    }
  `;
  const [AddUser, { data, loading, error, called }] = useMutation(graphqlQuery);

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    const name = values.userName;
    const email = values.userEmail;
    const password = values.password;

    AddUser({
      variables: {
        userData: {
          name: name,
          email: email,
          password: password,
        },
      },
    })
      .then((res) => {
        console.log(res);
        message.success("User Created Successfully", 5);
        message.success("You can login now", 2);

        props.onChangelogin(true);
        props.onChangeIsAuth(false);
        props.onChangeToken("");
        // props.onChangeFeed([]);
      })
      .catch((err) => {
        const messageText = err.message;
        message.warning(messageText, 5);
      });
  };

  const changeToLogin = () => {
    props.onChangelogin(true);
  };
  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
        >
          <Input prefix={<UserAddOutlined />} placeholder="Name" />
        </Form.Item>
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
        <p
          onClick={changeToLogin}
          style={{ color: "#1890ff", cursor: "pointer" }}
        >
          Already registered Login?
        </p>
      </Form>
    </div>
  );
};

export default Register;
