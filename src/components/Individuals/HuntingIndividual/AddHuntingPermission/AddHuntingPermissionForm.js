import React from 'react';
// import { string, func, shape, oneOfType, instanceOf } from 'prop-types';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import CustomField from '../../../generic/CustomField';
import CustomSelect from '../../../generic/CustomSelect';
import CustomDatePicker from '../../../generic/CustomDatePicker';
import validationSchema from '../validationSchema/PermValidSchema';


const AddHuntingPermission = ({ initialValues, onSubmit }) => {

  return (
    <Formik validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initialValues}>
      {({ errors, handleSubmit }) => {

        return (
          <Form
            id="huntingPermission-form"
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
              <Col className="pl-3 pr-3">
                <Form.Group className="mb-2" as={Col} md={12} controlId="huntingLicense">
                  <CustomField name="huntingLicense" label="Охотничий билет" />
                </Form.Group>
                <Form.Group className="mb-2" as={Col} md={12} controlId="huntingFarmId">
                  <CustomSelect name="huntingFarmId" label="Охотничье угодье" />
                </Form.Group>
                <Form.Group className="mb-2" as={Col} md={12} controlId="seasonId">
                  <CustomSelect name="seasonId" label="Сезон" />
                </Form.Group>
                <Form.Group className="mb-2" as={Col} md={12} controlId="huntingTypeId">
                  <CustomSelect name="huntingTypeId" label="Вид охоты" />
                </Form.Group>
                <Form.Group className="mb-2" as={Col} md={12} controlId="methodRemoveId">
                  <CustomSelect name="methodRemoveId" label="Способ изъятия" />
                </Form.Group>

                <Col>
                  <Form.Row >
                    <Form.Group className="mb-2" as={Col} md={6} controlId="serialForm">
                      <CustomField name="serialForm" label="Серия бланнка" />
                    </Form.Group>
                    <Form.Group className="mb-2" as={Col} md={6} controlId="numberForm">
                      <CustomField name="numberForm" label="Номер бланка" />
                    </Form.Group>
                  </Form.Row>
                </Col>

                <Col>
                  <Form.Row >
                    <Form.Group className="mb-2" as={Col} md={8} controlId="fioGiven">
                      <CustomSelect name="fioGiven" label="Разрешение выдал" />
                    </Form.Group>
                    <Form.Group className="mb-2" as={Col} md={4} controlId="dateGiven">
                      <CustomDatePicker name="dateGiven" label="Дата выдачи" />
                    </Form.Group>
                  </Form.Row>
                </Col>

                <Form.Group className="mb-2" as={Col} md={12} controlId="issued">
                  <CustomField name="issued" label="Должность сотрудника" />
                </Form.Group>

                <Col>
                  <Form.Row >
                    <Form.Group className="mb-2" as={Col} md={6} controlId="tariff">
                      <CustomField name="tariff" label="Госпошлина" />
                    </Form.Group>
                    <Form.Group className="mb-2" as={Col} md={6} controlId="charge">
                      <CustomField name="charge" label="Установленный сбор" />
                    </Form.Group>
                  </Form.Row>
                </Col>
              </Col>
            </fieldset>
          </Form>
        )
      }
      }
    </Formik >
  );
};

// AddHuntingPermission.propTypes = {
//   initialValues: shape({
//     serialLicense: string,
//     numberLicense: string,
//     issueDate: oneOfType([instanceOf(Date)]),
//     employeesAuthorized: string,
//     issued: string,
//     reestrDate: oneOfType([instanceOf(Date)]),
//   }).isRequired,
//   onSubmit: func.isRequired,
// };

export default AddHuntingPermission;
