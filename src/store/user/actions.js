import axios from 'axios';

import { API_URL } from '../../utils/constants';
import objectToFormData from '../../utils/objectToFormData';
import { setAuthData, resetAuthData } from '../../services/authService';

import {
  SET_USER_DATA,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from '../actions';

const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

// Авторизация
const loginUserRequested = () => ({
  type: LOGIN_USER_REQUEST,
});

const loginUserSuccess = (item) => ({
  type: LOGIN_USER_SUCCESS,
  payload: item,
});

const loginUserError = (error) => ({
  type: LOGIN_USER_ERROR,
  payload: error,
});

const loginUserRequest = async ({ login, password }) => {
  return axios.post(`${API_URL}account/login`, { login, password }).then((response) => response.data);
};

const loginUser = (values) => (dispatch) => {
  dispatch(loginUserRequested());
  return loginUserRequest(values)
    .then((data) => {
      setAuthData(data);
      return dispatch(loginUserSuccess(data.token));
    })
    .catch((err) => dispatch(loginUserError(err)));
};

// Выход из аккаунта
const logoutUser = (history) => {
  resetAuthData();
  history.push('/');

  return {
    type: LOGOUT_USER,
  };
};

// Смена пароля
const changePasswordRequested = () => ({
  type: CHANGE_PASSWORD_REQUEST,
});

const changePasswordSuccess = (responseData) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: responseData,
});

const changePasswordError = (error) => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: error,
});

const changePasswordRequest = async (id, values) => {
  const formData = objectToFormData(values);
  return axios.post(`employees/${id}/jobposition`, formData).then((response) => response.data);
};

const changePassword = (id, values) => (dispatch) => {
  dispatch(changePasswordRequested());
  return changePasswordRequest(id, values)
    .then((data) => {
      dispatch(changePasswordSuccess(data));
      return 'Пароль успешно изменен.';
    })
    .catch((error) => {
      dispatch(changePasswordError(error));
      throw error;
    });
};

export { setUserData, loginUser, logoutUser, changePassword };
