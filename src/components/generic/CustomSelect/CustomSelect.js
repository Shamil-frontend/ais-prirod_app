import React, { useState } from 'react';
import { string, number, arrayOf, shape, oneOfType, bool, func, instanceOf } from 'prop-types';

import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

import './CustomSelect.scss';

const transformSelectData = (data) => {
  if (!data.length) {
    return data;
  }

  return data.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
};

const CustomSelect = ({ name, data, label, isLoading, isDisabled, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [field, meta, helpers] = useField(name);

  let classNames = 'custom-select2';

  if (field.value) {
    classNames += ' has-value';
  }

  if (isFocused) {
    classNames += ' is-focused';
  }

  if (meta.touched && meta.error) {
    classNames += ' is-invalid';
  }

  return (
    <div className={classNames}>
      <Select
        inputId={field.name}
        classNamePrefix="react-select"
        name={field.name}
        options={transformSelectData(data)}
        value={field.value}
        onChange={(val) => {
          if (onChange) {
            onChange(val);
          }
          return helpers.setValue(val);
        }}
        onBlur={(evt) => {
          setIsFocused(false);
          return field.onBlur(evt);
        }}
        onFocus={() => setIsFocused(true)}
        placeholder=""
        isClearable="true"
        isLoading={isLoading}
        isDisabled={isDisabled}
        menuPlacement="auto"
        openMenuOnFocus
      />

      <Form.Label>{label}</Form.Label>
      <Form.Control.Feedback className="invalid-tooltip" type="invalidd">
        {meta.error}
      </Form.Control.Feedback>
    </div>
  );
};

CustomSelect.defaultProps = {
  data: [],
  isLoading: false,
  isDisabled: false,
  onChange: undefined,
};

CustomSelect.propTypes = {
  name: string.isRequired,
  data: arrayOf(
    shape({
      id: oneOfType([string, number, bool]).isRequired,
      name: string.isRequired,
    })
  ),
  label: string.isRequired,
  isLoading: bool,
  isDisabled: oneOfType([bool, instanceOf(Error)]),
  onChange: func,
};

export default CustomSelect;
