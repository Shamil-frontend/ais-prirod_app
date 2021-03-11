import axios from '../../services/apiService';

import {
  SET_SEARCH_INDIVIDUALS,
  GET_SEARCH_INDIVIDUALS_REQUEST,
  GET_SEARCH_INDIVIDUALS_SUCCESS,
  GET_SEARCH_INDIVIDUALS_ERROR,
  GET_INDIVIDUAL_DATA_REQUEST,
  GET_INDIVIDUAL_DATA_SUCCESS,
  GET_INDIVIDUAL_DATA_ERROR,
  INDIVIDUALS_ADD_REQUEST,
  INDIVIDUALS_ADD_SUCCESS,
  INDIVIDUALS_ADD_ERROR,
  INDIVIDUALS_EDIT_REQUEST,
  INDIVIDUALS_EDIT_SUCCESS,
  INDIVIDUALS_EDIT_ERROR,
  INDIVIDUALS_DELETE_REQUEST,
  INDIVIDUALS_DELETE_SUCCESS,
  INDIVIDUALS_DELETE_ERROR,
} from '../actions';

const setSearchTextIndividual = (responseData) => ({
  type: SET_SEARCH_INDIVIDUALS,
  payload: responseData,
});

const setSearchText = (searchValue) => (dispatch) => {
  dispatch(setSearchTextIndividual(searchValue));
};

// Получение списка Физ. лиц по поиску
const getSearchIndividualsRequested = () => ({
  type: GET_SEARCH_INDIVIDUALS_REQUEST,
});

const getSearchIndividualsSuccess = (responseData) => ({
  type: GET_SEARCH_INDIVIDUALS_SUCCESS,
  payload: responseData,
});

const getSearchIndividualsError = (error) => ({
  type: GET_SEARCH_INDIVIDUALS_ERROR,
  payload: error,
});

const getSearchIndividualsRequest = async (searchValue) => {
  const params = {
    phrase: searchValue.trim()
  }
  return axios.get('dictionary/customers/search', { params }).then((response) => response.data);
};

const getSearchIndividuals = (searchValue) => (dispatch) => {
  dispatch(getSearchIndividualsRequested());
  return getSearchIndividualsRequest(searchValue)
    .then((data) => dispatch(getSearchIndividualsSuccess(data)))
    .catch((error) => dispatch(getSearchIndividualsError(error)));
};

// Получение данных Физ. лица по его ID
const getIndividualDataRequested = () => ({
  type: GET_INDIVIDUAL_DATA_REQUEST,
});

const getIndividualDataSuccess = (responseData) => ({
  type: GET_INDIVIDUAL_DATA_SUCCESS,
  payload: responseData,
});

const getIndividualDataError = (error) => ({
  type: GET_INDIVIDUAL_DATA_ERROR,
  payload: error,
});

const getIndividualDataRequest = async (id) => {
  const params = {
    id
  }
  return axios.get(`dictionary/customer`, { params }).then((response) => response.data);
};

const getIndividualData = (id) => (dispatch) => {
  dispatch(getIndividualDataRequested());
  return getIndividualDataRequest(id)
    .then((data) => dispatch(getIndividualDataSuccess(data)))
    .catch((error) => dispatch(getIndividualDataError(error)));
};

// Добавление ФЛ
const addIndividualRequested = () => ({
  type: INDIVIDUALS_ADD_REQUEST,
});

const addIndividualSuccess = (responseData) => ({
  type: INDIVIDUALS_ADD_SUCCESS,
  payload: responseData,
});

const addIndividualError = (error) => ({
  type: INDIVIDUALS_ADD_ERROR,
  payload: error,
});

const addIndividualRequest = async (values) => {
  const params = {
    values
  }
  return axios.post(`dictionary/customer`, { params }).then((response) => response.data);
};

const addIndividual = (values) => (dispatch) => {
  dispatch(addIndividualRequested());
  return addIndividualRequest(values)
    .then((data) => {
      dispatch(addIndividualSuccess(data));
      return 'Физическое лицо добавлено';
    })
    .catch((error) => {
      dispatch(addIndividualError(error));
      return error;
    });
};

// Изменение ФЛ
const individualEditRequested = () => ({
  type: INDIVIDUALS_EDIT_REQUEST,
});

const individualEditSuccess = (data) => ({
  type: INDIVIDUALS_EDIT_SUCCESS,
  payload: data,
});

const individualEditError = (error) => ({
  type: INDIVIDUALS_EDIT_ERROR,
  payload: error,
});

const individualEditRequest = async (values) => {
  const params = {
    values
  }
  return axios.put(`dictionary/customer`, { params }).then((response) => response.data);
};

const individualEdit = (values) => (dispatch) => {
  dispatch(individualEditRequested());
  return individualEditRequest(values)
    .then(() => {
      dispatch(individualEditSuccess(values));
      return 'Физ.лицо успешно изменено';
    })
    .catch((error) => {
      dispatch(individualEditError(error));
      throw error;
    });
};

// Удаление ФЛ
const deleteIndividualRequested = () => ({
  type: INDIVIDUALS_DELETE_REQUEST,
});

const deleteIndividualSuccess = (responseData) => ({
  type: INDIVIDUALS_DELETE_SUCCESS,
  payload: responseData,
});

const deleteIndividualError = (error) => ({
  type: INDIVIDUALS_DELETE_ERROR,
  payload: error,
});

const deleteIndividualRequest = async (id) => {
  return axios.delete('dictionary/customer', {
    params: {
      id
    }
  }).then((response) => response.data);
};

const deleteIndividual = (values) => (dispatch) => {
  dispatch(deleteIndividualRequested());
  return deleteIndividualRequest(values)
    .then(() => {
      dispatch(deleteIndividualSuccess(values.id));
      return 'Физическое лицо успешно удалено';
    })
    .catch((error) => {
      dispatch(deleteIndividualError(error));
      throw error;
    });
};



export { setSearchText, getSearchIndividuals, getIndividualData, addIndividual, individualEdit, deleteIndividual };
