import { Modal } from "antd";

const CustomModal = ({ title, handleCancel, handleOk, isModalOpen }) => {
  return (
    <Modal
      title="Confirmation"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {title}
    </Modal>
  );
};

export default CustomModal;
