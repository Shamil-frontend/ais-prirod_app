import React from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import LoadingIndicator from '../LoadingIndicator';
import ErrorIndicator from '../ErrorIndicator';
import Scrollbar from '../Scrollbar';
import Icon from '../Icon';

import './SelectTable.scss';

const SelectTable = ({ name, data, label, multiple, isLoading, error, maxHeight, afterChange }) => {
  const [field, meta, helpers] = useField(name);

  let classNames = 'select-table';

  if (field.value.length) {
    classNames += ' has-value';
  }

  if (meta.touched && meta.error) {
    classNames += ' is-invalid';
  }

  const addItem = (item) => helpers.setValue([...field.value, item]);
  const removeItem = (item) => helpers.setValue(field.value.filter((it) => it !== item));

  const onChange = (newValue) => {
    if (multiple) {
      if (field.value.some((it) => it === newValue)) {
        removeItem(newValue);
      } else {
        addItem(newValue);
      }
    } else {
      helpers.setValue([newValue]);
    }

    if (afterChange) {
      afterChange(newValue);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }

  if (!data.length) {
    return <span className="text-muted">Ничего не найдено</span>;
  }

  return (
    <div className={classNames}>
      {label && <Form.Label>{label}</Form.Label>}
      <Scrollbar maxHeight={maxHeight}>
        <Table responsive hover>
          <tbody>
            {data.map((it) => {
              const isSelected = field.value.some((val) => val === it);

              return (
                <tr key={it.id} className={isSelected ? 'active' : ''} onClick={() => onChange(it)}>
                  <td>{it.name}</td>
                  <td className="td-check">
                    <Icon name="success" />
                    <input
                      id={it.id}
                      name={field.name}
                      type={multiple ? 'checkbox' : 'radio'}
                      onChange={() => onChange(it)}
                      checked={isSelected}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Scrollbar>
      <Form.Control.Feedback className="invalid-tooltip" type="invalidd">
        {meta.error}
      </Form.Control.Feedback>
    </div>
  );
};

SelectTable.defaultProps = {
  label: undefined,
  isLoading: false,
  error: null,
  multiple: false,
  maxHeight: undefined,
  afterChange: undefined,
};

SelectTable.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  label: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  multiple: PropTypes.bool,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  afterChange: PropTypes.func,
};

export default SelectTable;
