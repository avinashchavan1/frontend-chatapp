import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./NewPost.css";
import NewPostForm from "../NewPostForm/NewPostForm";

import {
  DeleteFilled,
  EditFilled,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Modal, Button } from "antd";
const NewPost = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible((prevState) => !prevState);
  };
  return (
    <div id="new_post">
      <Button
        type="dashed"
        shape="round"
        size={"large"}
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
      >
        New Post
      </Button>
      <Modal
        destroyOnClose={true}
        okButtonProps={{ visible: false }}
        cancelButtonProps={{ visible: false }}
        title="New Post"
        visible={visible}
        closable={false}
        footer={null}
        // onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        // width={100}
      >
        <NewPostForm
          updatePostOnChange={props.updatePostOnChange}
          toggleModal={toggleModal}
        />
      </Modal>
    </div>
  );
};

export default NewPost;
