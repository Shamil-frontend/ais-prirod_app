import React from 'react';
import { string, number, shape, arrayOf, oneOfType, func } from 'prop-types';

import FormControl from 'react-bootstrap/FormControl';

const SelectFilter = ({ options, onChange }) => {
  return (
    <FormControl as="select" onChange={onChange}>
      {options.map(({ id, name }) => (
        <option key={id} value={name}>
          {name}
        </option>
      ))}
    </FormControl>
  );
};

SelectFilter.propTypes = {
  options: arrayOf(
    shape({
      id: oneOfType([string, number]).isRequired,
      name: string.isRequired,
    })
  ).isRequired,
  onChange: func.isRequired,
};

export default SelectFilter;
