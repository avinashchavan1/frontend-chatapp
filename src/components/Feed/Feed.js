import "./Feed.css";

import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { List, Avatar, Button, Skeleton } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const Feed = (props) => {
  const list = props.data;

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
              avatar={<Avatar src={item.picture.large} />}
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
