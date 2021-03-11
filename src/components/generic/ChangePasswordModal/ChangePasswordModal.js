import React from 'react';
import { bool, func } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { string, object, ref } from 'yup';
import { Formik } from 'formik';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import CustomField from '../CustomField';

import SubmitBtn from '../SubmitBtn';

import { changePassword } from '../../../store/user/actions';

const validationSchema = object().shape({
  password: string().required(),
  newPassword: string().required().min(6),
  confirmPassword: string()
    .oneOf([ref('newPassword'), null], 'Введенные пароли не совпадают')
    .required(),
});

const initialValues = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePasswordModal = ({ isModalOpen, closeModal }) => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(changePassword(values))
      .then((data) => {
        toast.success(data);
        closeModal();
      })
      .catch((error) => toast.error((error.response && error.response.data) || error.message));
  };

  const { changingPass } = useSelector(({ user }) => user);

  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Body className="p-4">
        <h2 className="mb-4 text-center">Смена пароля</h2>
        <Formik
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          initialValues={initialValues}
        >
          {({ errors, handleSubmit }) => (
            <Form
              noValidate
              onSubmit={(evt) => {
                evt.preventDefault();

                if (Object.keys(errors).length) {
                  toast.error('Заполните все обязательные поля');
                }

                handleSubmit();
              }}
            >
              <Form.Group controlId="password">
                <CustomField name="password" type="password" label="Текущий пароль" />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="newPassword">
                  <CustomField name="newPassword" type="password" label="Новый пароль" />
                </Form.Group>
                <Form.Group as={Col} controlId="confirmPassword">
                  <CustomField
                    name="confirmPassword"
                    type="password"
                    label="Подтверждение пароля"
                  />
                </Form.Group>
              </Form.Row>
              <div className="mt-4 text-center">
                <SubmitBtn isSubmitting={changingPass} text="Сменить" />
                <Button className="ml-2" variant="light" onClick={closeModal}>
                  Отмена
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  isModalOpen: bool.isRequired,
  closeModal: func.isRequired,
};

export default ChangePasswordModal;
