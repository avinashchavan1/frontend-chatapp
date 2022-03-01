import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./EditPost.css";
import EditForm from "../EditForm/EditForm";

import {
  DeleteFilled,
  EditFilled,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
const EditPost = (props) => {
  const [visible, setVisible] = useState(true);

  const toggleModal = () => {
    setVisible((prevState) => !prevState);
  };
  return (
    <Modal
      destroyOnClose={true}
      okButtonProps={{ visible: false }}
      cancelButtonProps={{ visible: false }}
      title="Edit Post"
      visible={visible}
      closable={false}
      footer={null}
      // onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      // width={100}
    >
      <EditForm
        updatePostOnEdit={props.updatePostOnEdit}
        toggleModal={toggleModal}
        item={props.item}
      />
    </Modal>
  );
};

export default EditPost;
