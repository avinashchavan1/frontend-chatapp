import "./Feed.css";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { List, Avatar, Button, Skeleton } from "antd";
import { DeleteFilled, EditFilled, DownloadOutlined } from "@ant-design/icons";

const Feed = (props) => {
  //   console.log("Props", props.data);
  //   const [list, setlist] = useState(props.data);
  const [posts, setPosts] = useState([]);
  //   const list = props.data;
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
        console.log(res.data.posts);
        setPosts(res.data.posts);
      })
      .catch((err) => console.log(err));
  };

  useEffect(loadPosts, []);

  const deletePost = (item) => {
    console.log(item);
    console.log(posts);
    const filtered = posts.filter((data) => data.id !== item.id);
    console.log(filtered);
    setPosts(filtered);
  };
  const addPost = () => {
    const post = {
      id: "13",
      content:
        "This is a new PosThis is a new PosThis is a new PosThis is a new PosThis is a new Post",
      title: "1 This is Post",
      imageUrl: "Ha this is the link",
      creator: "3",
      createdAt: "2022-03-01T05:15:31.084Z",
      updatedAt: "2022-03-01T05:15:31.084Z",
    };
    let newPosts = [post, ...posts];
    setPosts(newPosts);
  };
  return (
    <div className="feed-componet">
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="dashed"
                onClick={() => addPost()}
                icon={<EditFilled />}
              >
                Edit
              </Button>,
              <Button
                type="dashed"
                onClick={() => deletePost(item)}
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
                      backgroundColor: randColor(),
                    }}
                  >
                    {item.content[0] + item.content[2]}
                  </Avatar>
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.content}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <Button
        type="primary"
        shape="round"
        // onClick={onGetData}
        icon={<DownloadOutlined />}
      >
        Change Data
      </Button>
    </div>
  );
};

export default Feed;
