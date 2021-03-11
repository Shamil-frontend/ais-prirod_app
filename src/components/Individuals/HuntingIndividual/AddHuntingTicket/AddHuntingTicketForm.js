import React from 'react';
import { string, func, shape, oneOfType, instanceOf } from 'prop-types';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import CustomField from '../../../generic/CustomField';
import CustomDatePicker from '../../../generic/CustomDatePicker';
import validationSchema from '../validationSchema/TicketValidSchema';


const AddHuntingTicketForm = ({ initialValues, onSubmit }) => {

  return (
    <Formik validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initialValues}>
      {({ errors, handleSubmit }) => {

        return (
          <Form
            id="huntingTicket-form"
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
                <Form.Group className="mb-2" as={Col} md={12} controlId="serialLicense">
                  <CustomField name="serialLicense" label="Серия" mask="serialLicense" />
                </Form.Group>
                <Form.Group className="mb-2" as={Col} md={12} controlId="numberLicense">
                  <CustomField name="numberLicense" label="Номер" mask="numberLicense" />
                </Form.Group>

                <Col>
                  <Form.Row >
                    <Form.Group className="mb-2" as={Col} md={6} controlId="issueDate">
                      <CustomDatePicker name="issueDate" label="Дата выдачи" />
                    </Form.Group>
                    <Form.Group className="mb-2" as={Col} md={6} controlId="reestrDate">
                      <CustomDatePicker name="reestrDate" label="Дата внесения в реестр" />
                    </Form.Group>
                  </Form.Row>
                </Col>

                <Form.Group className="mb-2" as={Col} md={12} controlId="employeesAuthorized">
                  <CustomField name="employeesAuthorized" label="Уполномоченное лицо" />
                </Form.Group>
                <Form.Group className="mb-2" as={Col} md={12} controlId="issued">
                  <CustomField name="issued" label="Кем выдан" />
                </Form.Group>
              </Col>
            </fieldset>
          </Form>
        )
      }
      }
    </Formik >
  );
};

AddHuntingTicketForm.propTypes = {
  initialValues: shape({
    serialLicense: string,
    numberLicense: string,
    issueDate: oneOfType([instanceOf(Date)]),
    employeesAuthorized: string,
    issued: string,
    reestrDate: oneOfType([instanceOf(Date)]),
  }).isRequired,
  onSubmit: func.isRequired,
};

export default AddHuntingTicketForm;
