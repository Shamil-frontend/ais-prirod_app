import axios from '../../services/apiService';

import {
  GET_HUNTING_LICENSE_REQUEST,
  GET_HUNTING_LICENSE_SUCCESS,
  GET_HUNTING_LICENSE_ERROR,
  ADD_HUNTING_LICENSE_REQUEST,
  ADD_HUNTING_LICENSE_SUCCESS,
  ADD_HUNTING_LICENSE_ERROR,
  EDIT_HUNTING_LICENSE_REQUEST,
  EDIT_HUNTING_LICENSE_SUCCESS,
  EDIT_HUNTING_LICENSE_ERROR,
  DELETE_HUNTING_LICENSE_REQUEST,
  DELETE_HUNTING_LICENSE_SUCCESS,
  DELETE_HUNTING_LICENSE_ERROR,
} from '../actions';

// Получение охот. билетов
const getHuntingLicenseRequested = () => ({
  type: GET_HUNTING_LICENSE_REQUEST,
});

const getHuntingLicenseSuccess = (responseData) => ({
  type: GET_HUNTING_LICENSE_SUCCESS,
  payload: responseData,
});

const getHuntingLicenseError = (error) => ({
  type: GET_HUNTING_LICENSE_ERROR,
  payload: error,
});

const getHuntingLicenseRequest = async (id) => {
  const params = {
    id
  }
  return axios.get(`dictionary/customer/huntingLicense`, { params }).then((response) => response.data);
};

const getHuntingLicense = (id) => (dispatch) => {
  dispatch(getHuntingLicenseRequested());
  return getHuntingLicenseRequest(id)
    .then((data) => dispatch(getHuntingLicenseSuccess(data)))
    .catch((error) => dispatch(getHuntingLicenseError(error)));
};

// Добавление охот. билета
const addHuntingLicenseRequested = () => ({
  type: ADD_HUNTING_LICENSE_REQUEST,
});

const addHuntingLicenseSuccess = (responseData) => ({
  type: ADD_HUNTING_LICENSE_SUCCESS,
  payload: responseData,
});

const addHuntingLicenseError = (error) => ({
  type: ADD_HUNTING_LICENSE_ERROR,
  payload: error,
});

const addHuntingLicenseRequest = async (values) => {
  const params = {
    values
  }
  return axios.post(`dictionary/customer/huntingLicense`, { params }).then((response) => response.data);
};

const addHuntingLicense = (values) => (dispatch) => {
  dispatch(addHuntingLicenseRequested());
  return addHuntingLicenseRequest(values)
    .then((data) => {
      dispatch(addHuntingLicenseSuccess(data));
      return 'Охотничий билет добавлен';
    })
    .catch((error) => {
      dispatch(addHuntingLicenseError(error));
      return error;
    });
};

// Изменение охот. билета
const editHuntingLicenseRequested = () => ({
  type: EDIT_HUNTING_LICENSE_REQUEST,
});

const editHuntingLicenseSuccess = (data) => ({
  type: EDIT_HUNTING_LICENSE_SUCCESS,
  payload: data,
});

const editHuntingLicenseError = (error) => ({
  type: EDIT_HUNTING_LICENSE_ERROR,
  payload: error,
});

const editHuntingLicenseRequest = async (values) => {
  const params = {
    values
  }
  return axios.put(`dictionary/customer/huntingLicense`, { params }).then((response) => response.data);
};

const editHuntingLicense = (values) => (dispatch) => {
  dispatch(editHuntingLicenseRequested());
  return editHuntingLicenseRequest(values)
    .then((values) => {
      dispatch(editHuntingLicenseSuccess(values));
      return 'Данные успешно изменены';
    })
    .catch((error) => {
      dispatch(editHuntingLicenseError(error));
      throw error;
    });
};

// Удаление охот. билета
const deleteHuntingLicenseRequested = () => ({
  type: DELETE_HUNTING_LICENSE_REQUEST,
});

const deleteHuntingLicenseSuccess = (responseData) => ({
  type: DELETE_HUNTING_LICENSE_SUCCESS,
  payload: responseData,
});

const deleteHuntingLicenseError = (error) => ({
  type: DELETE_HUNTING_LICENSE_ERROR,
  payload: error,
});

const deleteHuntingLicenseRequest = async (id) => {
  return axios.delete('dictionary/customer/huntingLicense', {
    params: {
      id
    }
  }).then((response) => response.data);
};

const deleteHuntingLicense = (values) => (dispatch) => {
  dispatch(deleteHuntingLicenseRequested());
  return deleteHuntingLicenseRequest(values)
    .then((values) => {
      dispatch(deleteHuntingLicenseSuccess(values));
      return 'Охотничий билет удален';
    })
    .catch((error) => {
      dispatch(deleteHuntingLicenseError(error));
      throw error;
    });
};



export { getHuntingLicense, addHuntingLicense, editHuntingLicense, deleteHuntingLicense };
