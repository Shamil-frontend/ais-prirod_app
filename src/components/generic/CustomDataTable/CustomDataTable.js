import React from 'react';
import {
  string,
  number,
  bool,
  arrayOf,
  shape,
  oneOfType,
  instanceOf,
  object as obj,
} from 'prop-types';

import Table from 'react-bootstrap/Table';

import Alert from 'react-bootstrap/Alert';
import FilterModal from './FilterModal';
import SortColumn from './SortColumn';

import sortArray from '../../../utils/sortArray';
import filterArray from '../../../utils/filterArray';

import './CustomDataTable.scss';

const renderCell = (item) => {
  if (typeof item === 'string' || typeof item === 'number') {
    return item;
  }

  if (!item) {
    return null;
  }

  if (typeof item === 'object') {
    return item.render;
  }

  return item;
};

const CustomDataTable = ({ columns, data, searchValue }) => {
  const [allTableData, setAllTableData] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [sort, setSort] = React.useState({
    currentSortedField: '',
    isSortedByDescending: false,
  });
  const [filterState, setFilterState] = React.useState({});

  // Сортировка
  const sortItems = (field) => {
    const isCurrentField = field === sort.currentSortedField;

    if (isCurrentField) {
      setSort({
        currentSortedField: field,
        isSortedByDescending: !sort.isSortedByDescending,
      });
      return setTableData([...tableData].reverse());
    }

    setSort({
      currentSortedField: field,
      isSortedByDescending: true,
    });

    return setTableData(sortArray(tableData, field));
  };

  // Фильтрация
  const filterTable = (field, values) => {
    const newFilter = {
      ...filterState,
      [field]: values,
    };

    const filteredItems = filterArray(allTableData, newFilter);

    setFilterState(newFilter);
    setTableData(filteredItems);
  };

  React.useEffect(() => {
    const newFilterState = {
      searchBy: [],
    };
    columns.forEach(({ key, isSearchable, filterBy }) => {
      if (isSearchable) {
        newFilterState.searchBy.push(key);
      }

      if (filterBy) {
        newFilterState[filterBy] = [];
      }
    });
    setFilterState(newFilterState);
  }, [columns]);

  React.useEffect(() => {
    setAllTableData(data);
    setTableData(data);
  }, [data]);

  React.useEffect(() => {
    if (allTableData.length) {
      filterTable('searchValue', searchValue);
    }
  }, [searchValue]);

  return (
    <Table
      className="custom-data-table"
      style={{ gridTemplateColumns: `repeat(${columns.length}, auto)` }}
    >
      <thead>
        <tr>
          {columns.map(({ key, value, isSortable, filter, filterBy, classNames }) => (
            <th key={key} className={classNames}>
              {isSortable ? (
                <SortColumn field={key} state={sort} onSort={sortItems}>
                  {value}
                </SortColumn>
              ) : (
                value
              )}

              {filter ? (
                <FilterModal
                  options={filter}
                  submittedValues={filterState[filterBy]}
                  onFilter={(values) => filterTable(filterBy, values)}
                />
              ) : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.length ? (
          tableData.map((row) => (
            <tr key={row.id}>
              {columns.map(({ key }) => (
                <td key={key}>{renderCell(row[key])}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} style={{ gridColumn: `span ${columns.length}` }}>
              <Alert variant="secondary">Ничего не найдено</Alert>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

CustomDataTable.defaultProps = {
  searchValue: '',
};

CustomDataTable.propTypes = {
  columns: arrayOf(
    shape({
      key: string.isRequired,
      value: string.isRequired,
      isSortable: bool,
      filter: shape({
        data: arrayOf(
          shape({
            id: oneOfType([string, number]).isRequired,
            name: string.isRequired,
          })
        ).isRequired,
        loading: bool.isRequired,
        error: instanceOf(Error),
      }),
      classNames: string,
    })
  ).isRequired,
  data: arrayOf(obj).isRequired,
  searchValue: string,
};

export default CustomDataTable;
