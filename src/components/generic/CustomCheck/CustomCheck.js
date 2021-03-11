import React from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';
import Form from 'react-bootstrap/Form';

import './CustomCheck.scss';

const CustomCheck = ({ name, gender, type, value, as, isDisabled, onFocusOut }) => {
  const [field, meta] = useField(name);

  let classNames = 'custom-check';

  if (field.value || field.value === 0) {
    classNames += ' has-value';
  }

  if (meta.touched && meta.error) {
    classNames += ' is-invalid';
  }

  return (
    <div className={classNames}>
      <Form.Control
        type={type}
        as={as}
        id={field.id}
        name={field.name}
        value={value}
        onChange={field.onChange}
        onBlur={(evt) => {
          if (onFocusOut) {
            onFocusOut();
          }
          return field.onBlur(evt);
        }}
        isInvalid={meta.touched && meta.error}
        disabled={isDisabled}
      />
      <Form.Label>{gender === "male" ? "Муж" : "Жен"}</Form.Label>
      <Form.Control.Feedback className="invalid-tooltip" type="invalidd">
        {meta.error}
      </Form.Control.Feedback>
    </div>
  );
};

CustomCheck.defaultProps = {
  type: 'text',
  gender: 'male',
  value: 0,
  as: undefined,
  isDisabled: false,
  onFocusOut: undefined,
};

CustomCheck.propTypes = {
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  as: PropTypes.string,
  isDisabled: PropTypes.bool,
  onFocusOut: PropTypes.func,
};

export default CustomCheck;
