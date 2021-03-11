import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import AddHuntingFarmForm from './AddHuntingFarmForm';
import initialValues from '../initialValues/FarmInitValues';

import SubmitBtn from '../../../generic/SubmitBtn';
import Icon from '../../../generic/Icon';

import { addHuntingFarm } from '../../../../store/huntingFarm/actions';

import '../HuntingFarm.scss';

const AddHuntingFarm = () => {

  const { adding } = useSelector(({ huntingFarm }) => huntingFarm);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addItem = (values) => {
    dispatch(addHuntingFarm(values))
      .then((data) => {
        toast.success(data);
        closeModal();
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
          <Modal.Title>Форма добовления охот. билета</Modal.Title>
          <Button className="btn-icon" onClick={() => closeModal()}>
            <Icon className="secondary" name="close" width="24px" height="24px" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <AddHuntingFarmForm initialValues={initialValues} onSubmit={addItem} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={closeModal} disabled={adding}>
            Отмена
          </Button>
          <SubmitBtn isSubmitting={adding} form="huntingFarm-form" />
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default AddHuntingFarm;
