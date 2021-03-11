import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Button } from 'react-bootstrap';
import Icon from '../generic/Icon';
import Tooltip from '../generic/Tooltip';
import './SearchBar.scss';

const SearchBar = ({ onSubmit, searchValue, placeholder, classs }) => {
  const [value, setValue] = React.useState(searchValue);
  const [validated, setValidated] = React.useState(false);

  const onSave = (evt) => {
    const form = evt.currentTarget;
    evt.preventDefault();
    if (form.checkValidity() === false) {
      evt.stopPropagation();
    } else {
      onSubmit(value);
    }

    setValidated(true);
  }

  React.useEffect(() => {
    if (searchValue) {
      setValue(searchValue)
    }
  }, [searchValue])

  return (
    <Form noValidate validated={validated} onSubmit={onSave}>
      <InputGroup className="serchBar-wrapper">
        <Tooltip title="Поиск по ФИО, по номеру телефона, по почте">
          <Form.Control
            className={`serch-bar ${classs}`}
            placeholder={placeholder}
            required
            onChange={(evt) => setValue(evt.target.value)}
            value={value}
          />
        </Tooltip>

        <Button className="btn-search" type="submit" variant="">Найти</Button>

        <span className="search-icon">
          <Icon className="" name="filter" width="18px" height="18px" />
        </span>
        <Form.Control.Feedback tooltip type="invalid">
          Вы не ввели данные
        </Form.Control.Feedback>
      </InputGroup>
    </Form>
  )
}

SearchBar.defaultProps = {
  placeholder: '',
  classs: '',
  searchValue: '',
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  searchValue: PropTypes.string,
  classs: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
