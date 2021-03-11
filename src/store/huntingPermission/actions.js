import axios from '../../services/apiService';

import {
  GET_HUNTING_PERMISSION_REQUEST,
  GET_HUNTING_PERMISSION_SUCCESS,
  GET_HUNTING_PERMISSION_ERROR,
  ADD_HUNTING_PERMISSION_REQUEST,
  ADD_HUNTING_PERMISSION_SUCCESS,
  ADD_HUNTING_PERMISSION_ERROR,
  EDIT_HUNTING_PERMISSION_REQUEST,
  EDIT_HUNTING_PERMISSION_SUCCESS,
  EDIT_HUNTING_PERMISSION_ERROR,
  DELETE_HUNTING_PERMISSION_REQUEST,
  DELETE_HUNTING_PERMISSION_SUCCESS,
  DELETE_HUNTING_PERMISSION_ERROR,
} from '../actions';

// Получение списка разрешений на охоту
const getHuntingPermissionRequested = () => ({
  type: GET_HUNTING_PERMISSION_REQUEST,
});

const getHuntingPermissionSuccess = (responseData) => ({
  type: GET_HUNTING_PERMISSION_SUCCESS,
  payload: responseData,
});

const getHuntingPermissionError = (error) => ({
  type: GET_HUNTING_PERMISSION_ERROR,
  payload: error,
});

const getHuntingPermissionRequest = async () => {
  // const params = {
  //   id
  // }
  return axios.get(`dictionary/customer/huntingPermission`).then((response) => response.data);
};

const getHuntingPermission = (id) => (dispatch) => {
  dispatch(getHuntingPermissionRequested());
  return getHuntingPermissionRequest(id)
    .then((data) => dispatch(getHuntingPermissionSuccess(data)))
    .catch((error) => dispatch(getHuntingPermissionError(error)));
};

// Добавление разрешения на охоту
const addHuntingPermissionRequested = () => ({
  type: ADD_HUNTING_PERMISSION_REQUEST,
});

const addHuntingPermissionSuccess = (responseData) => ({
  type: ADD_HUNTING_PERMISSION_SUCCESS,
  payload: responseData,
});

const addHuntingPermissionError = (error) => ({
  type: ADD_HUNTING_PERMISSION_ERROR,
  payload: error,
});

const addHuntingPermissionRequest = async (values) => {
  const params = {
    values
  }
  return axios.post(`dictionary/customer/huntingPermission`, { params }).then((response) => response.data);
};

const addHuntingPermission = (values) => (dispatch) => {
  dispatch(addHuntingPermissionRequested());
  return addHuntingPermissionRequest(values)
    .then((data) => {
      dispatch(addHuntingPermissionSuccess(data));
      return 'Разрешение добавлено';
    })
    .catch((error) => {
      dispatch(addHuntingPermissionError(error));
      return error;
    });
};

// Изменение разрешения на охоту
const editHuntingPermissionRequested = () => ({
  type: EDIT_HUNTING_PERMISSION_REQUEST,
});

const editHuntingPermissionSuccess = (data) => ({
  type: EDIT_HUNTING_PERMISSION_SUCCESS,
  payload: data,
});

const editHuntingPermissionError = (error) => ({
  type: EDIT_HUNTING_PERMISSION_ERROR,
  payload: error,
});

const editHuntingPermissionRequest = async (values) => {
  const params = {
    values
  }
  return axios.put(`dictionary/customer/huntingPermission`, { params }).then((response) => response.data);
};

const editHuntingPermission = (values) => (dispatch) => {
  dispatch(editHuntingPermissionRequested());
  return editHuntingPermissionRequest(values)
    .then((values) => {
      dispatch(editHuntingPermissionSuccess(values));
      return 'Данные успешно изменены';
    })
    .catch((error) => {
      dispatch(editHuntingPermissionError(error));
      throw error;
    });
};

// Удаление разрешения на охоту
const deleteHuntingPermissionRequested = () => ({
  type: DELETE_HUNTING_PERMISSION_REQUEST,
});

const deleteHuntingPermissionSuccess = (responseData) => ({
  type: DELETE_HUNTING_PERMISSION_SUCCESS,
  payload: responseData,
});

const deleteHuntingPermissionError = (error) => ({
  type: DELETE_HUNTING_PERMISSION_ERROR,
  payload: error,
});

const deleteHuntingPermissionRequest = async (id) => {
  return axios.delete('dictionary/customer/huntingPermission', {
    params: {
      id
    }
  }).then((response) => response.data);
};

const deleteHuntingPermission = (values) => (dispatch) => {
  dispatch(deleteHuntingPermissionRequested());
  return deleteHuntingPermissionRequest(values)
    .then((values) => {
      dispatch(deleteHuntingPermissionSuccess(values));
      return 'Разрешение удалено';
    })
    .catch((error) => {
      dispatch(deleteHuntingPermissionError(error));
      throw error;
    });
};



export { getHuntingPermission, addHuntingPermission, editHuntingPermission, deleteHuntingPermission };
