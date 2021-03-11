import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import parseISO from 'date-fns/parseISO';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import SubmitBtn from '../../generic/SubmitBtn';
import Icon from '../../generic/Icon';
import Tooltip from '../../generic/Tooltip';

import IndividualEditForm from './IndividualEditForm';
import prepareEditingItemValues from '../../../utils/prepareEditingItemValues';

import { individualEdit, getSearchIndividuals, setSearchText } from '../../../store/individuals/actions';

const initialValues = {
  id: '',
  lastName: '',
  firstName: '',
  middleName: '',
  birthDate: null,
  birthPlace: '',
  identityDocument: {
    serial: '',
    number: '',
    issueDate: null,
    issuePlace: '',
    code: '',
    addressRegistration: ''
  },
  addressLiving: '',
  phoneNumber1: '',
  phoneNumber2: '',
  email: '',
  snils: '',
  gender: '',
  inn: '',
  photo: null,
  orgName: '',
  orgAddress: '',
  orgEmail: '',
  orgPhone: '',
  legalForm: '',
  isLicenseVisible: false,
};

const IndividualEdit = ({ data, icon, history }) => {
  const [initValues, setInitValues] = React.useState(initialValues);

  const { editing } = useSelector(({ individuals }) => individuals);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const editItem = (values) => {
    dispatch(individualEdit(values))
      .then((data) => {
        toast.success(data);
        dispatch(getSearchIndividuals(`${values.lastName} ${values.firstName} ${values.middleName}`));
        dispatch(setSearchText(`${values.lastName} ${values.firstName} ${values.middleName}`))
        history.push(`/individuals/${values.firstName}`);
      })
      .catch((error) => toast.error(error.message));
  };

  useEffect(() => {
    const values = prepareEditingItemValues(data, initialValues);
    setInitValues({
      ...values,
      gender: String(values.gender),
      photo: null,
      birthDate: parseISO(values.birthDate),
      identityDocument: {
        ...values.identityDocument,
        issueDate: parseISO(values.identityDocument.issueDate),
      },
    });
  }, [data]);

  return (
    <>
      <Tooltip title="Редактировать данные">
        <Button className="btn-icon" onClick={openModal}>
          <Icon className="primary" name={`${icon}`} width="20px" height="24px" />
          {/* {icon &&
          <Icon className={`ml-1 ${icon === 'edit' ? 'mb-1 secondary' : 'primary'}`} name={icon} width={`${icon === "editPencil" ? "14px" : "24px"}`} height={`${icon === "editPencil" ? "14px" : "22px"}`} />
        } */}
        </Button>
      </Tooltip>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="modal-info">
        <Modal.Header>
          <Modal.Title>Редактирование Физ. лица</Modal.Title>
          <Button className="btn-icon" onClick={() => closeModal()}>
            <Icon className="secondary" name="close" width="24px" height="24px" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <IndividualEditForm onSubmit={editItem} initialValues={initValues} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={closeModal} disabled={editing}>
            Отмена
          </Button>
          <SubmitBtn isSubmitting={editing} text="Обновить" form="individual-form" />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default withRouter(IndividualEdit);
