import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { string, number, func, shape, oneOfType, object } from 'prop-types';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import CustomField from '../../../generic/CustomField';
import CustomSelect from '../../../generic/CustomSelect';

import validationSchema from '../validationSchema/FarmValidSchema';
import { getHuntingFarmType } from '../../../../store/huntingFarmType/actions';
import { getLegalPerson } from '../../../../store/legalPerson/actions';

const AddHuntingFarmForm = ({ initialValues, onSubmit }) => {

  const dispatch = useDispatch();

  const huntingFarmType = useSelector(({ huntingFarmType }) => ({
    data: huntingFarmType.huntingFarmTypeData,
    loading: huntingFarmType.loading,
    error: huntingFarmType.error,
  }));

  const legalPerson = useSelector(({ legalPerson }) => ({
    data: legalPerson.legalPersonData,
    loading: legalPerson.loading,
    error: legalPerson.error,
  }));

  useEffect(() => {
    dispatch(getHuntingFarmType());
    dispatch(getLegalPerson());
  }, [dispatch]);

  return (
    <Formik validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initialValues}>
      {({ errors, handleSubmit }) => {

        return (
          <Form
            id="huntingFarm-form"
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
                <Form.Group className="mb-2" as={Col} md={12} controlId="name">
                  <CustomField name="name" label="Наименование охотхозяйства" />
                </Form.Group>
                <Form.Group className="mb-2" as={Col} md={12} controlId="area">
                  <CustomField type="number" name="area" label="Площадь территории" />
                </Form.Group>
                <Form.Group className="mb-2" as={Col} md={12}>
                  <CustomSelect
                    name="huntingFarmTypeId"
                    // placeholder="Орг. структура"
                    label="Вид охот. хозяйства"
                    data={huntingFarmType.data}
                    isLoading={huntingFarmType.loading}
                    isDisabled={huntingFarmType.error}
                  />
                </Form.Group>
                <Form.Group className="mb-2" as={Col} md={12}>
                  <CustomSelect
                    name="legalPersonId"
                    // placeholder="Орг. структура"
                    label="Связь с юр. лицом"
                    data={legalPerson.data}
                    isLoading={legalPerson.loading}
                    isDisabled={legalPerson.error}
                  />
                </Form.Group>
                <Form.Group className="mb-2" as={Col} md={12} controlId="address">
                  <CustomField name="address" label="Сведения о местоположени" />
                </Form.Group>
                <Form.Group className="mb-2" as={Col} md={12} controlId="description">
                  <CustomField name="description" label="Описание" />
                </Form.Group>
                <Form.Group as={Col} md={12} controlId="commentt">
                  <CustomField name="commentt" label="Комментарий" as="textarea" />
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

AddHuntingFarmForm.propTypes = {
  initialValues: shape({
    name: string,
    area: number,
    huntingFarmTypeId: oneOfType([object]),
    legalPersonId: oneOfType([object]),
    address: string,
    description: string,
    commentt: string,
  }).isRequired,
  onSubmit: func.isRequired,
};

export default AddHuntingFarmForm;
