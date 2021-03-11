import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import IndividualForm from './IndividualForm';
import initialValues from '../initialValues';

import SubmitBtn from '../../generic/SubmitBtn';
import Icon from '../../generic/Icon';

import { setSearchText, addIndividual, getSearchIndividuals } from '../../../store/individuals/actions';

const IndividualAdd = ({ history }) => {

  const { adding } = useSelector(({ individuals }) => individuals);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addItem = (values) => {
    dispatch(addIndividual(values))
      .then((data) => {
        toast.success(data);
        closeModal();
        dispatch(getSearchIndividuals(`${values.lastName.trim()} ${values.firstName.trim()} ${values.middleName.trim()}`));
        dispatch(setSearchText(`${values.lastName.trim()} ${values.firstName.trim()} ${values.middleName.trim()}`))
        history.push(`/individuals/${values.firstName}`);
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <>
      <Button onClick={openModal} size="sm">
        Добавить
      </Button>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="modal-info">
        <Modal.Header className="individual-modal-header">
          <Modal.Title>Форма добовления физ.лица</Modal.Title>
          <Button className="btn-icon" onClick={() => closeModal()}>
            <Icon className="secondary" name="close" width="24px" height="24px" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <IndividualForm initialValues={initialValues} onSubmit={addItem} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={closeModal} disabled={adding}>
            Отмена
          </Button>
          <SubmitBtn isSubmitting={adding} form="individual-form" />
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default withRouter(IndividualAdd);
