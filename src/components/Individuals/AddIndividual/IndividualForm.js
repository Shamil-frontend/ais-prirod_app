import React from 'react';
import { object, string, func, shape, oneOfType, instanceOf } from 'prop-types';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CustomField from '../../generic/CustomField';
import CustomDatePicker from '../../generic/CustomDatePicker';
import CustomPhotoField from '../../generic/CustomPhotoField';
import CustomCheck from '../../generic/CustomCheck/CustomCheck';
import validationSchema from '../validationSchema';


const IndividualForm = ({ initialValues, onSubmit }) => {

  const onSave = ({ huntingLicenseData, isLicenseVisible, ...rest }) => {
    const values = rest;

    if (isLicenseVisible) {
      values.huntingLicenseData = huntingLicenseData
    }
    onSubmit(values)
  }

  return (
    <Formik enableReinitialize validationSchema={validationSchema} onSubmit={onSave}
      initialValues={initialValues}
    >
      {({ values, errors, handleSubmit, setFieldValue }) => {
        const { isLicenseVisible } = values;
        return (
          <Form
            id="individual-form"
            className="wrapper-info-modal"
            noValidate
            onSubmit={(evt) => {
              evt.preventDefault();

              if (Object.keys(errors).length) {
                toast.error('Заполните все обязательные поля');
              }

              handleSubmit();
            }}
          >

            <fieldset className="mb-5">
              <legend>Основные данные</legend>
              <Col>
                <Row className="flex-nowrap">
                  <div className="modal-image">
                    <Form.Group
                      className="text-center text-sm-right"
                      as={Col}
                      sm="auto"
                      controlId="photo"
                    >
                      <CustomPhotoField name="photo" label="Фото" width="150px" height="150px" />
                    </Form.Group>
                  </div>
                  <Col className="flex-grow-1">
                    <Form.Row className="m-0">
                      <Form.Group as={Col} md={4} controlId="lastName">
                        <CustomField name="lastName" label="Фамилия" />
                      </Form.Group>

                      <Form.Group as={Col} md={4} controlId="firstName">
                        <CustomField name="firstName" label="Имя" />
                      </Form.Group>

                      <Form.Group as={Col} md={4} controlId="middleName">
                        <CustomField name="middleName" label="Отчество" />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row className="m-0">
                      <Form.Group as={Col} sm={8} controlId="birthPlace">
                        <CustomField name="birthPlace" label="Место рождения" />
                      </Form.Group>

                      <Form.Group as={Col} sm={4} controlId="birthDate">
                        <CustomDatePicker name="birthDate" label="Дата рождения" mask="birthDate" />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row className="m-0">
                      <Form.Group as={Col} sm={4} controlId="snils">
                        <CustomField name="snils" label="СНИЛС" mask="snils" />
                      </Form.Group>

                      <Form.Group as={Col} sm={4} controlId="inn">
                        <CustomField name="inn" label="ИНН" mask="inn" />
                      </Form.Group>
                      <Form.Row className="justify-content-around m-0 align-items-center" as={Col} sm={4}>
                        <Form.Group controlId="gender1">
                          <CustomCheck type="radio" name="gender" gender="male" value="1" />
                        </Form.Group>
                        <Form.Group controlId="gender2">
                          <CustomCheck type="radio" name="gender" gender="female" value="2" />
                        </Form.Group>
                      </Form.Row>
                    </Form.Row>
                  </Col>
                </Row>
              </Col>
            </fieldset>

            <fieldset className="mb-5">
              <legend>Паспортные данные</legend>
              <Col className="pl-3 pr-3">
                <Form.Row className="m-0">
                  <Form.Group as={Col} md={12} controlId="identityDocument.addressRegistration">
                    <CustomField name="identityDocument.addressRegistration" label="Адрес регистрации" />
                  </Form.Group>
                </Form.Row>
                <Form.Row className="m-0">
                  <Form.Group as={Col} md={3} controlId="identityDocument.serial">
                    <CustomField name="identityDocument.serial" label="Серия" mask="pasportSerials" />
                  </Form.Group>
                  <Form.Group as={Col} md={3} controlId="identityDocument.number">
                    <CustomField name="identityDocument.number" label="Номер" mask="pasportNumbers" />
                  </Form.Group>
                  <Form.Group as={Col} md={3} controlId="identityDocument.issueDate">
                    <CustomDatePicker name="identityDocument.issueDate" label="Дата выдачи" />
                  </Form.Group>
                  <Form.Group as={Col} md={3} controlId="identityDocument.code">
                    <CustomField
                      name="identityDocument.code"
                      label="Код подразделения"
                      mask="pasportCode"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row className="m-0 mb-0">
                  <Form.Group as={Col} md={12} controlId="identityDocument.issuePlace">
                    <CustomField name="identityDocument.issuePlace" label="Кем выдан" />
                  </Form.Group>
                </Form.Row>
              </Col>
            </fieldset>

            <fieldset className="mb-5">
              <legend>Контакты</legend>
              <Col className="pl-3 pr-3">
                <Form.Row className="m-0">
                  <Form.Group as={Col} md={12} controlId="addressLiving">
                    <CustomField name="addressLiving" label="Адрес проживания" />
                  </Form.Group>
                </Form.Row>
                <Form.Row className="m-0 mb-0">
                  <Form.Group as={Col} md={4} controlId="phoneNumber1">
                    <CustomField type="tel" name="phoneNumber1" label="Телефон" mask="tel" />
                  </Form.Group>
                  <Form.Group as={Col} md={4} controlId="phoneNumber2">
                    <CustomField type="tel" name="phoneNumber2" label="Телефон (доп.)" mask="tel" />
                  </Form.Group>
                  <Form.Group as={Col} sm={4} controlId="email">
                    <CustomField type="email" name="email" label="E-mail" />
                  </Form.Group>
                </Form.Row>
              </Col>
            </fieldset>

            <fieldset className="mb-5">
              <legend>Место работы</legend>
              <Col className="pl-3 pr-3">
                <Form.Row className="m-0">
                  <Form.Group as={Col} sm={4} controlId="orgName">
                    <CustomField name="orgName" label="Организация" />
                  </Form.Group>
                  <Form.Group as={Col} sm={8} controlId="orgAddress">
                    <CustomField name="orgAddress" label="Адрес организаци" />
                  </Form.Group>
                </Form.Row>
                <Form.Row className="m-0 mb-0">
                  <Form.Group as={Col} sm={2} controlId="legalForm">
                    <CustomField type="email" name="legalForm" label="ОПФ" />
                  </Form.Group>
                  <Form.Group as={Col} sm={6} controlId="orgEmail">
                    <CustomField type="email" name="orgEmail" label="E-mail" />
                  </Form.Group>
                  <Form.Group as={Col} sm={4} controlId="orgPhone">
                    <CustomField type="tel" name="orgPhone" label="Телефон" mask="tel" />
                  </Form.Group>
                </Form.Row>
              </Col>
            </fieldset>

            <fieldset className="mb-5">
              <div className="title-wrapper">
                <legend>Охотничий билет</legend>
                <Form.Check
                  className="btn-switch"
                  type="switch"
                  id="custom-switch"
                  onChange={() => setFieldValue('isLicenseVisible', !isLicenseVisible)}
                />
              </div>
              <Col className={`pl-3 pr-3 ${!isLicenseVisible ? 'd-none' : null}`}>
                <Form.Row className="m-0">
                  <Form.Group as={Col} sm={3} controlId="huntingLicenseData.issueDate">
                    <CustomDatePicker name="huntingLicenseData.issueDate" label="Дата выдачи" />
                  </Form.Group>
                  <Form.Group as={Col} sm={3} controlId="huntingLicenseData.reestrDate">
                    <CustomDatePicker name="huntingLicenseData.reestrDate" label="Дата в реестре" />
                  </Form.Group>
                  <Form.Group as={Col} sm={3} controlId="huntingLicenseData.serialLicense">
                    <CustomField name="huntingLicenseData.serialLicense" label="Серия лицензии" mask="serialLicense" />
                  </Form.Group>
                  <Form.Group as={Col} sm={3} controlId="huntingLicenseData.numberLicense">
                    <CustomField name="huntingLicenseData.numberLicense" label="Номер лицензии" mask="numberLicense" />
                  </Form.Group>
                </Form.Row>
                <Form.Row className="m-0">
                  <Form.Group as={Col} sm={6} controlId="huntingLicenseData.employeeAuthorized">
                    <CustomField name="huntingLicenseData.employeesAuthorized" label="Уполномоченное лицо" />
                  </Form.Group>
                  <Form.Group as={Col} sm={6} controlId="huntingLicenseData.issued">
                    <CustomField name="huntingLicenseData.issued" label="Кем выдан" />
                  </Form.Group>
                </Form.Row>
                {/* <Form.Row className="m-0 mb-5">
                  <Form.Group as={Col} sm={6} controlId="huntingLicenseData.cancelledDate">
                    <CustomDatePicker name="huntingLicenseData.cancelledDate" label="Дата отмены" />
                  </Form.Group>
                  <Form.Group as={Col} sm={6} controlId="huntingLicenseData.cancelledGround">
                    <CustomField name="huntingLicenseData.cancelledGround" label="Аннулированая земля" />
                  </Form.Group>
                </Form.Row> */}
              </Col>
            </fieldset>

          </Form>
        )
      }
      }
    </Formik >
  );
};

IndividualForm.propTypes = {
  initialValues: shape({
    lastName: string,
    firstName: string,
    middleName: string,
    birthDate: oneOfType([instanceOf(Date)]),
    birthPlace: string,
    identityDocument: shape({
      serial: string,
      number: string,
      issueDate: oneOfType([instanceOf(Date)]),
      issuePlace: string,
      code: string,
    }),
    addressRegistration: string,
    addressLiving: string,
    phoneNumber1: string,
    phoneNumber2: string,
    email: string,
    photo: oneOfType([object]),
    snils: string,
    inn: string,
    gender: string,
    orgName: string,
    orgAddress: string,
    orgEmail: string,
    orgPhone: string,
    legalForm: string,
    huntingLicenseData: shape({
      serialLicense: string,
      numberLicense: string,
      issueDate: oneOfType([instanceOf(Date)]),
      employeeAuthorized: string,
      issued: string,
      reestrDate: oneOfType([instanceOf(Date)]),
      cancelledDate: oneOfType([instanceOf(Date)]),
      cancelledGround: string,
    })
  }).isRequired,
  onSubmit: func.isRequired,
};

export default IndividualForm;
