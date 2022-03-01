import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./NewPostForm.css";
import { Form, Input, InputNumber, Button } from "antd";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
const randColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};

const NewPostForm = (props) => {
  const graphqlQuery = gql`
    mutation AddPost($postData: PostInputData!) {
      addPost(postData: $postData) {
        id
        title
        creatorName
        content
        imageUrl
        creator
        createdAt
        updatedAt
      }
    }
  `;

  const [addPost, { data, loading, error, called }] = useMutation(graphqlQuery);
  const onFinish = (values) => {
    console.log(values);
    const title = values.title;
    const content = values.content;
    const imageUrl = "ImageURl" + title;
    const token = localStorage.getItem("token");
    const variables = {
      title: title,
      content: content,
      imageUrl: "http://imageUrl.com/" + title,
      creator: "Meee",
    };
    addPost({
      variables: {
        postData: {
          title: title,
          content: content,
          imageUrl: "http://imageUrl.com/" + title,
          creator: "Meee",
        },
      },
    })
      .then((result) => {
        let post = result.data.addPost;
        post = { ...post, color: randColor() };
        console.log(post);
        props.updatePostOnChange(post);

        props.toggleModal();
      })
      .catch((err) => console.log(err));
  };

  if (data) {
    console.log(data);
  }
  //props.updatePostOnChange(post);
  //props.toggleModal();
  return (
    <Form name="nest-messages" onFinish={onFinish}>
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="content" label="Content">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 10 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default NewPostForm;
