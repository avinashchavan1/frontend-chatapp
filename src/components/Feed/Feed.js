import "./Feed.css";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { List, Avatar, Button, Skeleton } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const Feed = (props) => {
  const list = props.data;
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
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(loadPosts, []);
  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button type="dashed" icon={<EditFilled />}>
              Edit
            </Button>,
            <Button type="dashed" danger icon={<DeleteFilled />}>
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
                  {item.name.first[0] + item.name.last[0]}
                </Avatar>
              }
              title={<a href="https://ant.design">{item.name.last}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
  //   return <h1>From Feed</h1>;
};

export default Feed;
