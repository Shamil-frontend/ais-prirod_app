import axios from '../../services/apiService';

import {
  GET_HUNTING_FARM_REQUEST,
  GET_HUNTING_FARM_SUCCESS,
  GET_HUNTING_FARM_ERROR,
  ADD_HUNTING_FARM_REQUEST,
  ADD_HUNTING_FARM_SUCCESS,
  ADD_HUNTING_FARM_ERROR,
  EDIT_HUNTING_FARM_REQUEST,
  EDIT_HUNTING_FARM_SUCCESS,
  EDIT_HUNTING_FARM_ERROR,
  DELETE_HUNTING_FARM_REQUEST,
  DELETE_HUNTING_FARM_SUCCESS,
  DELETE_HUNTING_FARM_ERROR,
} from '../actions';

// Получение охот. угодий
const getHuntingFarmRequested = () => ({
  type: GET_HUNTING_FARM_REQUEST,
});

const getHuntingFarmSuccess = (responseData) => ({
  type: GET_HUNTING_FARM_SUCCESS,
  payload: responseData,
});

const getHuntingFarmError = (error) => ({
  type: GET_HUNTING_FARM_ERROR,
  payload: error,
});

const getHuntingFarmRequest = async (id) => {
  const params = {
    id
  }
  return axios.get(`reference/huntingFarm`, { params }).then((response) => response.data);
};

const getHuntingFarm = (id) => (dispatch) => {
  dispatch(getHuntingFarmRequested());
  return getHuntingFarmRequest(id)
    .then((data) => dispatch(getHuntingFarmSuccess(data)))
    .catch((error) => dispatch(getHuntingFarmError(error)));
};

// Добавление охот. угодий
const addHuntingFarmRequested = () => ({
  type: ADD_HUNTING_FARM_REQUEST,
});

const addHuntingFarmSuccess = (responseData) => ({
  type: ADD_HUNTING_FARM_SUCCESS,
  payload: responseData,
});

const addHuntingFarmError = (error) => ({
  type: ADD_HUNTING_FARM_ERROR,
  payload: error,
});

const addHuntingFarmRequest = async (values) => {
  const params = {
    values
  }
  return axios.post(`reference/huntingFarm`, { params }).then((response) => response.data);
};

const addHuntingFarm = (values) => (dispatch) => {
  dispatch(addHuntingFarmRequested());
  return addHuntingFarmRequest(values)
    .then((data) => {
      dispatch(addHuntingFarmSuccess(data));
      return 'Охотничий угодий добавлен';
    })
    .catch((error) => {
      dispatch(addHuntingFarmError(error));
      return error;
    });
};

// Изменение охот. угодий
const editHuntingFarmRequested = () => ({
  type: EDIT_HUNTING_FARM_REQUEST,
});

const editHuntingFarmSuccess = (data) => ({
  type: EDIT_HUNTING_FARM_SUCCESS,
  payload: data,
});

const editHuntingFarmError = (error) => ({
  type: EDIT_HUNTING_FARM_ERROR,
  payload: error,
});

const editHuntingFarmRequest = async (values) => {
  const params = {
    values
  }
  return axios.put(`reference/huntingFarm`, { params }).then((response) => response.data);
};

const editHuntingFarm = (values) => (dispatch) => {
  dispatch(editHuntingFarmRequested());
  return editHuntingFarmRequest(values)
    .then((values) => {
      dispatch(editHuntingFarmSuccess(values));
      return 'Данные успешно изменены';
    })
    .catch((error) => {
      dispatch(editHuntingFarmError(error));
      throw error;
    });
};

// Удаление охот. угодий
const deleteHuntingFarmRequested = () => ({
  type: DELETE_HUNTING_FARM_REQUEST,
});

const deleteHuntingFarmSuccess = (responseData) => ({
  type: DELETE_HUNTING_FARM_SUCCESS,
  payload: responseData,
});

const deleteHuntingFarmError = (error) => ({
  type: DELETE_HUNTING_FARM_ERROR,
  payload: error,
});

const deleteHuntingFarmRequest = async (id) => {
  return axios.delete('reference/huntingFarm', {
    params: {
      id
    }
  }).then((response) => response.data);
};

const deleteHuntingFarm = (values) => (dispatch) => {
  dispatch(deleteHuntingFarmRequested());
  return deleteHuntingFarmRequest(values)
    .then((values) => {
      dispatch(deleteHuntingFarmSuccess(values));
      return 'Охотничий угодье удалено';
    })
    .catch((error) => {
      dispatch(deleteHuntingFarmError(error));
      throw error;
    });
};



export { getHuntingFarm, addHuntingFarm, editHuntingFarm, deleteHuntingFarm };
