import React from 'react';
import { string, number, oneOfType, func } from 'prop-types';

import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';

const DeleteItemModal = ({ id, deleteItem, onModalClose }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isValidated, setIsValidated] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const submitBtn = React.useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsValidated(false);
    onModalClose();
  };

  const onSubmit = (evt) => {
    const form = evt.currentTarget;

    evt.preventDefault();

    if (form.checkValidity() === false) {
      evt.stopPropagation();
      setIsDeleting(false);
    } else {
      setIsDeleting(true);
      deleteItem(id)
        .then((data) => {
          toast.success(data);
          setIsDeleting(false);
          return setIsModalOpen(false);
        })
        .catch((error) => {
          toast.error((error.response && error.response.data) || error.message);
          setIsDeleting(false);
        });
    }

    setIsValidated(true);
  };

  React.useEffect(() => {
    if (id) {
      openModal();
    }
  }, [id]);

  React.useEffect(() => {
    if (isModalOpen) {
      submitBtn.current.focus();
    }
  }, [isModalOpen])

  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Body>
        <h2 className="mb-4 text-center">Удалить ?</h2>
        <Form validated={isValidated} onSubmit={onSubmit} noValidate>
          <div className="mt-4 text-center">
            <Button type="submit" ref={submitBtn} variant="danger" disabled={isDeleting} >
              {isDeleting ? (
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              ) : (
                  "Удалить"
                )}
            </Button>
            <Button className="ml-2" variant="light" onClick={closeModal}>
              Отмена
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

DeleteItemModal.propTypes = {
  id: oneOfType([string, number]).isRequired,
  deleteItem: func.isRequired,
  onModalClose: func.isRequired,
};

export default DeleteItemModal;
