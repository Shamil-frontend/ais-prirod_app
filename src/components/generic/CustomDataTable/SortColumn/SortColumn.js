import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Icon from '../../Icon';

import './SortColumn.scss';

const SortColumn = ({ field, state, children, onSort }) => {
  const iconSort = state.isSortedByDescending ? (
    <Icon name="descending" width="10px" height="18px" />
  ) : (
    <Icon name="ascending" width="10px" height="18px" />
  );

  return (
    <Button variant="icon" className="btn-sort" onClick={() => onSort(field)}>
      {state.currentSortedField === field && iconSort}
      <span>{children}</span>
    </Button>
  );
};

SortColumn.propTypes = {
  field: PropTypes.string.isRequired,
  state: PropTypes.shape({
    currentSortedField: PropTypes.string,
    isSortedByDescending: PropTypes.bool.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default SortColumn;
