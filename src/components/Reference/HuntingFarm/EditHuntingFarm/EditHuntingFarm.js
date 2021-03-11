import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import parseISO from 'date-fns/parseISO';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import SubmitBtn from '../../../generic/SubmitBtn';
import Icon from '../../../generic/Icon';
import Tooltip from '../../../generic/Tooltip';

import initialValues from '../initialValues/FarmInitValues';
import EditHuntingFarmForm from './EditHuntingFarmForm';

import { editHuntingFarm } from '../../../../store/huntingFarm/actions';


const EditHuntingFarm = ({ data, classs, icon }) => {
  const [initValues, setInitValues] = React.useState(initialValues);

  const { editing } = useSelector(({ huntingLicense }) => huntingLicense);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const editItem = (values) => {
    dispatch(editHuntingFarm(values))
      .then((data) => {
        toast.success(data);
        closeModal();
      })
      .catch((error) => toast.error(error.message));
  };

  useEffect(() => {
    setInitValues({
      ...data,
      issueDate: parseISO(data.issueDate),
      reestrDate: parseISO(data.reestrDate),
      cancelledDate: data.cancelledDate ? parseISO(data.cancelledDate) : null,
      cancelledGround: '',
    });
  }, [data]);

  return (
    <>
      <Tooltip title="Редактировать данные">
        <Button variant={`btn ${classs}`} style={{ cssFloat: 'right' }} onClick={openModal}>
          <Icon className="primary" name={`${icon}`} width="16px" height="16px" />
        </Button>
      </Tooltip>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="modal-huntingTicket">
        <Modal.Header>
          <Modal.Title>Редактирование данных охотничьего билета</Modal.Title>
          <Button className="btn-icon" onClick={() => closeModal()}>
            <Icon className="secondary" name="close" width="24px" height="24px" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <EditHuntingFarmForm onSubmit={editItem} initialValues={initValues} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={closeModal} disabled={editing}>
            Отмена
          </Button>
          <SubmitBtn isSubmitting={editing} text="Обновить" form="huntingTicket-form" />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditHuntingFarm;
