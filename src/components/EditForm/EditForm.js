import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./EditForm.css";
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

const EditForm = (props) => {
  const item = props.item;

  console.log(props.item);
  const graphqlQuery = gql`
    mutation UpdatePost($updatePostId: ID!, $postData: PostInputData!) {
      updatePost(id: $updatePostId, postData: $postData) {
        id
        title
        content
        imageUrl
        creator
        createdAt
        updatedAt
        creatorName
      }
    }
  `;

  const [EditPost, { data, loading, error, called }] =
    useMutation(graphqlQuery);

  const onFinish = (values) => {
    let title = values.title;
    let content = values.content;

    title = title === undefined ? item.title : title;
    content = content === undefined ? item.content : content;
    // console.log(title, content);

    EditPost({
      variables: {
        updatePostId: item.id,
        postData: {
          title: title,
          content: content,
          imageUrl: "http://imageUrl.com/" + title,
          creator: "Dummy11 Text",
        },
      },
    })
      .then((result) => {
        let post = result.data.updatePost;
        post = { ...post, color: randColor() };
        console.log(post);
        props.updatePostOnEdit(post);
        props.toggleModal();
      })
      .catch((err) => console.log(err));
  };

  //props.updatePostOnChange(post);
  //props.toggleModal();
  return (
    <Form name="nest-messages" onFinish={onFinish}>
      <Form.Item name="title" label="Title">
        <Input defaultValue={item.title} />
      </Form.Item>
      <Form.Item name="content" label="Content">
        <Input.TextArea defaultValue={item.content} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 10 }}>
        <Button type="primary" htmlType="submit">
          Submit!
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EditForm;
