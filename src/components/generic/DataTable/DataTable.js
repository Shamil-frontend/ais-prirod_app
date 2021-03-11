import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

import './DataTable.scss';

const DataTable = ({ columnsCount, children }) => (
  <Table className="data-table" style={{ gridTemplateColumns: `repeat(${columnsCount}, auto)` }}>
    {children}
  </Table>
);

DataTable.propTypes = {
  columnsCount: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
};

export default DataTable;
