import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import AddHuntingTicketForm from './AddHuntingTicketForm';
import initialValues from '../initialValues/TicketInitValues';

import SubmitBtn from '../../../generic/SubmitBtn';
import Icon from '../../../generic/Icon';
import Tooltip from '../../../generic/Tooltip';

import { addHuntingLicense } from '../../../../store/huntingLicense/actions';

import '../HuntingIndividual.scss';

const AddHuntingTicket = ({ customerId, toggleBtn }) => {

  const initValues = {
    ...initialValues,
    customerId
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
      <Tooltip title={`${toggleBtn >= 1 ? "Невозможно добавить, так как уже имеется активный охот. билет" : "Добавить билет"}`}>
        <Button
          onClick={toggleBtn >= 1 ? null : openModal}
          size="sm"
        // className={`${toggleBtn >= 1 ? "hunting-add-btn disabled" : "hunting-add-btn"}`}
        >
          добавить
        </Button>
      </Tooltip>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="modal-info">
        <Modal.Header className="individual-modal-header">
          <Modal.Title>Форма добовления охот. билета</Modal.Title>
          <Button className="btn-icon" onClick={() => closeModal()}>
            <Icon className="secondary" name="close" width="24px" height="24px" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <AddHuntingTicketForm initialValues={initValues} onSubmit={addItem} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={closeModal} disabled={adding}>
            Отмена
          </Button>
          <SubmitBtn isSubmitting={adding} form="huntingTicket-form" />
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default AddHuntingTicket;
