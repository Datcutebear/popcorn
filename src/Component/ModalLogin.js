import { useState } from 'react';
import { Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function ModalLogin() {
    let navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      navigate("/login")
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    return (
        <div>
         
           
            {
              showModal ? <Modal
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Đăng nhập"
              cancelText = "Hủy"
          >
              <span>Bạn cần đăng nhập để sử dụng dịch vụ này!</span>
          </Modal> : ""
            }
          
           
        </div>
    )
}
export default ModalLogin