import "./Feed.css";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { List, Avatar, Button, Skeleton, Divider, message } from "antd";

import { gql, useMutation, useQuery } from "@apollo/client";

import {
  DeleteFilled,
  EditFilled,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import NewPost from "../NewPost/NewPost";
import EditPost from "../EditPost/EditPost";

const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const [editmodal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [currUser, setCurrUser] = useState("");
  const graphqlQuery = gql`
    mutation AddPost($id: ID!) {
      deletePost(id: $id)
    }
  `;

  const [deletePost, { data, loading, error, called }] =
    useMutation(graphqlQuery);
  const randColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };

  const loadPosts = () => {
    const graphqlQuery = {
      query: `query{
            posts {
                id
                content
                title
                imageUrl
                creator
                createdAt
                updatedAt
                creatorName
              }
        }
        `,
    };
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + props.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        let posts = res.data.posts.reverse();
        posts = posts.map((post) => {
          return { ...post, color: randColor() };
        });
        console.log(posts);
        setPosts(posts);
        // setPosts(res.data.posts.reverse());
      })
      .catch((err) => console.log(err));
  };

  useEffect(loadPosts, []);

  const onDeletePost = (item) => {
    const key = "updatable";
    message.loading({ content: "Deleting Post...", key });

    console.log(item);
    console.log(posts);

    const id = item.id;
    deletePost({ variables: { id: id } })
      .then((res) => {
        message.success({ content: "Post Deleted!", key });

        console.log(res);
        if (res.data.deletePost) {
          const filtered = posts.filter((data) => data.id !== item.id);
          console.log(filtered);
          setPosts(filtered);
        }
      })
      .catch((err) => {
        console.log(err);
        const messageText = err.message;
        message.warning({ content: messageText, key });
      });
  };
  const OnEditPost = (item) => {
    setEditModal((prevEditModal) => !prevEditModal);
    // console.log(item);
    setEditItem(item);
  };

  const updatePostOnChange = (post) => {
    setPosts((prevState) => [post, ...prevState]);
  };

  const SplitName = (name) => {
    let splits = name.split(" ");
    if (splits.length > 1) {
      return splits[0][0] + splits[1][0];
    } else if (splits.length === 1) {
      return splits[0][0] + splits[0][1];
    } else {
      return "NN";
    }
  };
  const updatePostOnEdit = (post) => {
    let index = posts.findIndex((currPost) => post.id === currPost.id);
    console.log(post);
    console.log(posts);
    let tempPosts = [...posts];
    tempPosts[index] = post;
    setPosts(tempPosts);
    console.log(index);
  };
  return (
    <div className="feed-componet" id="feed_component">
      {<NewPost updatePostOnChange={updatePostOnChange} />}
      {editmodal && (
        <EditPost updatePostOnEdit={updatePostOnEdit} item={editItem} />
      )}
      <Divider dashed></Divider>
      <List
        className="demo-loadmore-list"
        id="demo_loadmore_list"
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="dashed"
                onClick={() => OnEditPost(item)}
                icon={<EditFilled />}
              >
                Edit
              </Button>,
              <Button
                type="dashed"
                onClick={() => onDeletePost(item)}
                danger
                icon={<DeleteFilled />}
              >
                Delete
              </Button>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={40}
                    style={{
                      backgroundColor: item.color,
                    }}
                  >
                    {SplitName(item.creatorName)}
                  </Avatar>
                }
                title={item.title}
                description={item.content}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      {/* <Button
        type="dashed"
        shape="round"
        // onClick={onGetData}
        icon={<DownloadOutlined />}
      >
        Change Data
      </Button> */}
    </div>
  );
};

export default Feed;
