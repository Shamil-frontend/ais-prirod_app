import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import AddHuntingPermissionForm from './AddHuntingPermissionForm';
import initialValues from '../initialValues/PermInitValues';

import SubmitBtn from '../../../generic/SubmitBtn';
import Icon from '../../../generic/Icon';
import Tooltip from '../../../generic/Tooltip';

import { addHuntingLicense } from '../../../../store/huntingLicense/actions';

import '../HuntingIndividual.scss';

const AddHuntingPermission = ({ huntingId, toggleBtn }) => {

  const initValues = {
    ...initialValues,
    huntingId
  }

  const { adding } = useSelector(({ huntingLicense }) => huntingLicense);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addItem = (values) => {
    dispatch(addHuntingLicense(values))
      .then((data) => {
        toast.success(data);
        closeModal();
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <>
      <Tooltip title={`${toggleBtn >= 1 ? "Невозможно добавить, так как уже имеется активное разрешение" : "Добавить разрешение"}`}>
        <Button
          onClick={toggleBtn >= 1 ? null : openModal}
          size="sm"
          className={`${toggleBtn >= 1 ? "hunting-add-btn disabled" : "hunting-add-btn"}`}
        >
        </Button>
      </Tooltip>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="modal-info">
        <Modal.Header className="individual-modal-header">
          <Modal.Title>Форма добовления разрешения</Modal.Title>
          <Button className="btn-icon" onClick={() => closeModal()}>
            <Icon className="secondary" name="close" width="24px" height="24px" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <AddHuntingPermissionForm initialValues={initValues} onSubmit={addItem} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={closeModal} disabled={adding}>
            Отмена
          </Button>
          <SubmitBtn isSubmitting={adding} form="huntingPermission-form" />
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default AddHuntingPermission;
