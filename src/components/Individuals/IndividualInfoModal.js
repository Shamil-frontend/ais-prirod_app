import React from 'react';
import { object, func, oneOfType } from 'prop-types';
import { Col, Form, FormLabel, Image, Row } from 'react-bootstrap';
import userPic from '../../images/user.svg';
import Icon from '../generic/Icon';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import IndividualEdit from './IndividualEdit';
import convertDate from '../../utils/convertDate';

const IndividualInfoModal = ({ item, onModalClose }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = React.useCallback(() => setIsModalOpen(true), []);
  const closeModal = React.useCallback(() => {
    setIsModalOpen(false)
    onModalClose();
  }, [onModalClose]);

  React.useEffect(() => {
    if (item) {
      openModal();
    }
  }, [openModal, item])

  return (
    <Modal show={isModalOpen} onHide={closeModal} size="lg" className="modal-info">
      <Modal.Header className="individual-modal-header">
        <Modal.Title>Карточка физического лица</Modal.Title>
        <Button className="btn-icon" onClick={() => closeModal()}>
          <Icon className="secondary" name="close" width="24px" height="24px" />
        </Button>
      </Modal.Header>
      <Modal.Body >
        <div className="wrapper-info-modal">
          <fieldset className="mb-5">
            <legend className="modal-block-title">Основные данные</legend>
            <Col className="pl-3 pr-3">
              <Row className="flex-nowrap m-0">
                <div className="individual-image-wrapper modal-image">
                  <Image
                    className="mb-2 mr-1"
                    src={userPic}
                    width="150"
                    height="150"
                    alt="Фото сотрудника"
                    rounded
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <Col className="flex-grow-1">
                  <Form.Row className="m-0 mb-4 mt-2">
                    <Form.Group className="info-input-conteiner" as={Col} md={4}>
                      <FormLabel>Фамилия:</FormLabel>
                      <Form.Control
                        className="info-modal-input"
                        placeholder=""
                        value={item.lastName}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="info-input-conteiner" as={Col} md={4}>
                      <FormLabel>Имя:</FormLabel>
                      <Form.Control
                        className="info-modal-input"
                        placeholder=""
                        value={item.firstName}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="info-input-conteiner" as={Col} md={4}>
                      <FormLabel>Отчество:</FormLabel>
                      <Form.Control
                        className="info-modal-input"
                        placeholder=""
                        value={item.middleName}
                        disabled
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row className="m-0 mb-4">
                    <Form.Group className="info-input-conteiner" as={Col} md={8}>
                      <FormLabel>Место рождения:</FormLabel>
                      <Form.Control
                        className="info-modal-input"
                        placeholder=""
                        value={item.birthPlace}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="info-input-conteiner" as={Col} md={4}>
                      <FormLabel>Дата рождения:</FormLabel>
                      <Form.Control
                        className="info-modal-input"
                        placeholder=""
                        value={convertDate(item.birthDate)}
                        disabled
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row className="m-0">
                    <Form.Group className="info-input-conteiner" as={Col} md={4}>
                      <FormLabel>СНИЛС:</FormLabel>
                      <Form.Control
                        className="info-modal-input"
                        placeholder=""
                        value={item.snils}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="info-input-conteiner" as={Col} md={4}>
                      <FormLabel>ИНН:</FormLabel>
                      <Form.Control
                        className="info-modal-input"
                        placeholder=""
                        value={item.inn}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="info-input-conteiner" as={Col} md={4}>
                      <FormLabel>Пол:</FormLabel>
                      <Form.Control
                        className="info-modal-input"
                        placeholder=""
                        value={item.gender === 0 ? '' : item.gender === 1 ? "Мужской" : "Женский"}
                        disabled
                      />
                    </Form.Group>
                  </Form.Row>
                </Col>
              </Row>
            </Col>
          </fieldset>

          <fieldset className="mb-5">
            <legend className="modal-block-title">Паспортные данные</legend>
            <Col className="pl-3 pr-3">
              <Form.Row className="m-0 mb-4">
                <Form.Group className="info-input-conteiner" as={Col} md={3}>
                  <FormLabel>Серия:</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={item.identityDocument.serial}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="info-input-conteiner" as={Col} md={3}>
                  <FormLabel>Номер:</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={item.identityDocument.number}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="info-input-conteiner" as={Col} md={3}>
                  <FormLabel>Дата выдачи:</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={convertDate(item.identityDocument.issueDate)}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="info-input-conteiner" as={Col} md={3}>
                  <FormLabel>Код подразделения:</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={item.identityDocument.code}
                    disabled
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row className="m-0 mb-0">
                <Form.Group className="info-input-conteiner" as={Col} md={12}>
                  <FormLabel>Кем выдан:</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={item.identityDocument.issuePlace}
                    disabled
                  />
                </Form.Group>
              </Form.Row>
            </Col>
          </fieldset>

          <fieldset className="mb-5">
            <legend className="modal-block-title">Контакты</legend>
            <Col className="pl-3 pr-3">
              <Form.Row className="m-0 mb-4">
                <Form.Group className="info-input-conteiner" as={Col} md={6}>
                  <FormLabel>Адрес регистрации:</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={item.addressRegistration}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="info-input-conteiner" as={Col} md={6}>
                  <FormLabel>Адрес проживания:</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={item.addressLiving}
                    disabled
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row className="m-0 mb-0">
                <Form.Group className="info-input-conteiner" as={Col} md={4}>
                  <FormLabel>Телефон:</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={item.phoneNumber1}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="info-input-conteiner" as={Col} md={4}>
                  <FormLabel>Телефон (доп.):</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={item.phoneNumber2}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="info-input-conteiner" as={Col} md={4}>
                  <FormLabel>Email:</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={item.email}
                    disabled
                  />
                </Form.Group>
              </Form.Row>
            </Col>
          </fieldset>

          <fieldset className="mb-5">
            <legend className="modal-block-title">Место работы</legend>
            <Col className="pl-3 pr-3">
              <Form.Row className="m-0 mb-4">
                <Form.Group className="info-input-conteiner" as={Col} md={4}>
                  <FormLabel>Организация:</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={item.orgName}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="info-input-conteiner" as={Col} md={8}>
                  <FormLabel>Адрес организаци:</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={item.orgAddress}
                    disabled
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row className="m-0 mb-0">
                <Form.Group className="info-input-conteiner" as={Col} md={6}>
                  <FormLabel>Email:</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={item.orgEmail}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="info-input-conteiner" as={Col} md={6}>
                  <FormLabel>Телефон:</FormLabel>
                  <Form.Control
                    className="info-modal-input"
                    placeholder=""
                    value={item.orgPhone}
                    disabled
                  />
                </Form.Group>
              </Form.Row>
            </Col>
          </fieldset>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="block-dop-info-wrapper">
          <div className="block-dop-info">
            <div className="mr-3" >
              <span className="span-text-bold">добавил:</span>
              <span>{item.employeeFioAdd}</span>
            </div>
            <div>
              <span className="span-text-bold">дата добавления:</span>
              <span>{convertDate(item.dateAdd)}</span>
            </div>
          </div>
          {/* <IndividualEdit data={item} icon="edit" /> */}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

IndividualInfoModal.propTypes = {
  item: oneOfType([object]).isRequired,
  onModalClose: func.isRequired,
};

export default IndividualInfoModal;
