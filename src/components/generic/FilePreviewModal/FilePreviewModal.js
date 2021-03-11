import React from 'react';
import { object, func, oneOfType } from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

const FilePreviewModal = ({ item, onModalClose }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = React.useCallback(() => setIsModalOpen(true), []);
  const closeModal = () => {
    setIsModalOpen(false);
    return onModalClose();
  };

  React.useEffect(() => {
    openModal();
  }, [openModal]);

  return (
    <Modal show={isModalOpen} onHide={closeModal} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{item.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={item.previewUrl} alt={item.name} fluid className="w-100" />
      </Modal.Body>
    </Modal>
  );
};

FilePreviewModal.propTypes = {
  item: oneOfType([object]).isRequired,
  onModalClose: func.isRequired,
};

export default FilePreviewModal;
