import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import { toast } from 'react-toastify';
import { FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Icon from '../generic/Icon';
import Tooltip from '../generic/Tooltip';
import { resetAuthData } from '../../services/authService'

import { loginUser } from '../../store/user/actions'

import './LoginForm.scss';

const LoginForm = ({ history }) => {
  const dispatch = useDispatch();
  const { userData, error } = useSelector(({ user }) => user);

  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isValidated, setIsValidated] = React.useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = React.useState('');
  const [visiblePassword, SetVisiblePassword] = React.useState(false);

  useEffect(() => {
    if (error) {
      setSubmitBtnStatus('');
      resetAuthData();
    }
  }, [error]);

  useEffect(() => {
    if (userData) {
      history.push('/home');
    }
  }, [userData, history]);

  const onSubmit = (evt) => {
    const form = evt.currentTarget;

    evt.preventDefault();

    setIsValidated(true);

    if (form.checkValidity() === false) {
      evt.stopPropagation();
    } else {
      setSubmitBtnStatus('submiting');
      dispatch(loginUser({ login, password }));
    }
  };

  return (
    <div className="login-form">
      <Form validated={isValidated} onSubmit={onSubmit} noValidate>
        <div className="dv">
          <h4 className="logo-title-color">АИС Природа</h4>
          <h1>Вход в систему</h1>
        </div>

        <div className="dv2">
          <Form.Group controlId="login">
            <FormLabel className="login-label">Логин</FormLabel>
            <div className="auth-input-wrapper">
              <span>
                <Icon className="secondary" name="user-solid" width="20px" height="20px" />
              </span>
              <Form.Control
                className={`input-login-form ${login ? 'input-color' : null}`}
                // placeholder="your_login"
                value={login}
                onChange={(evt) => setLogin(evt.target.value)}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="password">
            <FormLabel className="login-label">Пароль</FormLabel>
            <div className="auth-input-wrapper">
              <span>
                <Icon className="secondary" name="lock-solid" width="20px" height="20px" />
              </span>
              <Form.Control
                className={`input-login-form ${password ? 'input-color' : null}`}
                type={`${visiblePassword ? 'text' : 'password'}`}
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                autoComplete="off"
              />
              {password ? (
                <Tooltip title={`${!visiblePassword ? 'Показать пароль' : 'Скрыть пароль'}`}>
                  <button
                    type="button"
                    className="btn btn-icon secondary"
                    onClick={() => SetVisiblePassword(!visiblePassword)}
                  >
                    <Icon name="eye" width="20px" height="20px" />
                  </button>
                </Tooltip>
              ) : null
              }
            </div>
          </Form.Group>

          {/* {error?.response.status === 400 ?
            (
              <div className="auth-incorrect-message">
                <span>{error?.response.data.message}</span>
              </div>
            ) : null
          } */}

          <Button type="submit" variant="primary" className="mt-4" block disabled={(password.length <= 3 || login.length <= 3)}>
            {submitBtnStatus === 'submiting' ? (
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            ) : (
                'Войти'
              )}
          </Button>
        </div>
      </Form>
    </div >
  );
};

LoginForm.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(LoginForm);
