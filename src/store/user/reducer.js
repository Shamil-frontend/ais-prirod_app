import jwtDecode from 'jwt-decode';

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

const INIT_STATE = {
  userData: null,
  loading: false,
  error: null,
  changingPass: false,
  errorChangingPass: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: jwtDecode(action.payload),
      };

    // Авторизация
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        userData: jwtDecode(action.payload),
        loading: false,
      };

    case LOGIN_USER_ERROR:
      return {
        ...state,
        userData: null,
        loading: false,
        error: action.payload,
      };

    // Выход из аккаунта
    case LOGOUT_USER:
      return {
        ...state,
        userData: null,
      };

    // Смена пароля
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changingPass: true,
        errorChangingPass: null,
      };

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changingPass: false,
      };

    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changingPass: false,
        errorChangingPass: action.payload,
      };

    default:
      return state;
  }
};
