import axios from '../../services/apiService';

import {
  GET_HUNTING_FARM_TYPE_REQUEST,
  GET_HUNTING_FARM_TYPE_SUCCESS,
  GET_HUNTING_FARM_TYPE_ERROR,
  ADD_HUNTING_FARM_TYPE_REQUEST,
  ADD_HUNTING_FARM_TYPE_SUCCESS,
  ADD_HUNTING_FARM_TYPE_ERROR,
  EDIT_HUNTING_FARM_TYPE_REQUEST,
  EDIT_HUNTING_FARM_TYPE_SUCCESS,
  EDIT_HUNTING_FARM_TYPE_ERROR,
  DELETE_HUNTING_FARM_TYPE_REQUEST,
  DELETE_HUNTING_FARM_TYPE_SUCCESS,
  DELETE_HUNTING_FARM_TYPE_ERROR,
} from '../actions';

// Получение типов охот. хозяйств
const getHuntingFarmTypeRequested = () => ({
  type: GET_HUNTING_FARM_TYPE_REQUEST,
});

const getHuntingFarmTypeSuccess = (responseData) => ({
  type: GET_HUNTING_FARM_TYPE_SUCCESS,
  payload: responseData,
});

const getHuntingFarmTypeError = (error) => ({
  type: GET_HUNTING_FARM_TYPE_ERROR,
  payload: error,
});

const getHuntingFarmTypeRequest = async (id) => {
  const params = {
    id
  }
  return axios.get(`reference/huntingFarmType`, { params }).then((response) => response.data);
};

const getHuntingFarmType = (id) => (dispatch) => {
  dispatch(getHuntingFarmTypeRequested());
  return getHuntingFarmTypeRequest(id)
    .then((data) => dispatch(getHuntingFarmTypeSuccess(data)))
    .catch((error) => dispatch(getHuntingFarmTypeError(error)));
};

// Добавление типов охот. хозяйств
const addHuntingFarmTypeRequested = () => ({
  type: ADD_HUNTING_FARM_TYPE_REQUEST,
});

const addHuntingFarmTypeSuccess = (responseData) => ({
  type: ADD_HUNTING_FARM_TYPE_SUCCESS,
  payload: responseData,
});

const addHuntingFarmTypeError = (error) => ({
  type: ADD_HUNTING_FARM_TYPE_ERROR,
  payload: error,
});

const addHuntingFarmTypeRequest = async (values) => {
  const params = {
    values
  }
  return axios.post(`reference/huntingFarmType`, { params }).then((response) => response.data);
};

const addHuntingFarmType = (values) => (dispatch) => {
  dispatch(addHuntingFarmTypeRequested());
  return addHuntingFarmTypeRequest(values)
    .then((data) => {
      dispatch(addHuntingFarmTypeSuccess(data));
      return 'Тип охот. хозяйста  добавлен';
    })
    .catch((error) => {
      dispatch(addHuntingFarmTypeError(error));
      return error;
    });
};

// Изменение типов охот. хозяйств
const editHuntingFarmTypeRequested = () => ({
  type: EDIT_HUNTING_FARM_TYPE_REQUEST,
});

const editHuntingFarmTypeSuccess = (data) => ({
  type: EDIT_HUNTING_FARM_TYPE_SUCCESS,
  payload: data,
});

const editHuntingFarmTypeError = (error) => ({
  type: EDIT_HUNTING_FARM_TYPE_ERROR,
  payload: error,
});

const editHuntingFarmTypeRequest = async (values) => {
  const params = {
    values
  }
  return axios.put(`reference/huntingFarmType`, { params }).then((response) => response.data);
};

const editHuntingFarmType = (values) => (dispatch) => {
  dispatch(editHuntingFarmTypeRequested());
  return editHuntingFarmTypeRequest(values)
    .then((values) => {
      dispatch(editHuntingFarmTypeSuccess(values));
      return 'Данные успешно изменены';
    })
    .catch((error) => {
      dispatch(editHuntingFarmTypeError(error));
      throw error;
    });
};

// Удаление типов охот. хозяйств
const deleteHuntingFarmTypeRequested = () => ({
  type: DELETE_HUNTING_FARM_TYPE_REQUEST,
});

const deleteHuntingFarmTypeSuccess = (responseData) => ({
  type: DELETE_HUNTING_FARM_TYPE_SUCCESS,
  payload: responseData,
});

const deleteHuntingFarmTypeError = (error) => ({
  type: DELETE_HUNTING_FARM_TYPE_ERROR,
  payload: error,
});

const deleteHuntingFarmTypeRequest = async (id) => {
  return axios.delete('reference/huntingFarmType', {
    params: {
      id
    }
  }).then((response) => response.data);
};

const deleteHuntingFarmType = (values) => (dispatch) => {
  dispatch(deleteHuntingFarmTypeRequested());
  return deleteHuntingFarmTypeRequest(values)
    .then((values) => {
      dispatch(deleteHuntingFarmTypeSuccess(values));
      return 'Тип охот. хозяйства  удален';
    })
    .catch((error) => {
      dispatch(deleteHuntingFarmTypeError(error));
      throw error;
    });
};



export { getHuntingFarmType, addHuntingFarmType, editHuntingFarmType, deleteHuntingFarmType };
