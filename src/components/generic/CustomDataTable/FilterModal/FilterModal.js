import React from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import Tooltip from '../../Tooltip';
import Icon from '../../Icon';
import SelectTable from '../../SelectTable';

import './FilterModal.scss';

const FilterModal = ({ options, submittedValues, onFilter, title }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [filterData, setFilterData] = React.useState([]);
  const { data, loading, error } = options;

  const closeModal = () => {
    setIsModalOpen(false);
    setFilterData(data);
  };
  const openModal = () => setIsModalOpen(true);

  const onSearchChange = (value) => {
    setFilterData(data.filter(({ name }) => name.toLowerCase().indexOf(value) > -1));
  };

  const onSubmit = ({ filterValue }) => {
    onFilter(filterValue);
    closeModal();
  };

  React.useEffect(() => {
    setFilterData(data);
  }, [data]);

  return (
    <>
      <Tooltip title="Фильтр">
        <Button className="filter-btn" variant="icon" onClick={openModal}>
          <Icon name={submittedValues.length ? 'filtered' : 'filter'} width="18px" height="18px" />
        </Button>
      </Tooltip>
      <Modal className="filter-modal" show={isModalOpen} onHide={closeModal} centered>
        <Modal.Body>
          <h3 className="mb-4 text-center">{title}</h3>

          <Formik
            onSubmit={onSubmit}
            initialValues={{
              filterValue: submittedValues,
            }}
          >
            {({ values, errors, handleSubmit, setFieldValue }) => (
              <Form
                noValidate
                onSubmit={(evt) => {
                  evt.preventDefault();

                  if (Object.keys(errors).length) {
                    toast.error('Выберите филиал для филтрации');
                  }

                  handleSubmit();
                }}
              >
                <Form.Row>
                  <Form.Group as={Col}>
                    <FormControl
                      type="search"
                      placeholder="Поиск..."
                      className="search-input"
                      size="sm"
                      onChange={(evt) => onSearchChange(evt.target.value.toLowerCase())}
                    />
                  </Form.Group>
                  <Form.Group as={Col} sm="auto">
                    {values.filterValue.length ? (
                      <Tooltip title="Очистить фильтр">
                        <Button variant="icon" onClick={() => setFieldValue('filterValue', [])}>
                          <Icon name="filter-clear" width="22px" height="22px" />
                        </Button>
                      </Tooltip>
                    ) : null}
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="filterValue">
                  <SelectTable
                    name="filterValue"
                    data={filterData}
                    isLoading={loading}
                    error={error}
                    multiple
                  />
                </Form.Group>
                <div className="mt-4 text-center">
                  <Button variant="light" onClick={closeModal}>
                    Отмена
                  </Button>
                  <Button className="ml-2" variant="primary" type="subimt">
                    Применить
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

FilterModal.defaultProps = {
  submittedValues: [],
  title: 'Фильтр',
};

FilterModal.propTypes = {
  options: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
  }).isRequired,
  submittedValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onFilter: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default FilterModal;
