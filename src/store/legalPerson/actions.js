import axios from '../../services/apiService';

import {
  GET_LEGAL_PERSON_REQUEST,
  GET_LEGAL_PERSON_SUCCESS,
  GET_LEGAL_PERSON_ERROR,
  ADD_LEGAL_PERSON_REQUEST,
  ADD_LEGAL_PERSON_SUCCESS,
  ADD_LEGAL_PERSON_ERROR,
  EDIT_LEGAL_PERSON_REQUEST,
  EDIT_LEGAL_PERSON_SUCCESS,
  EDIT_LEGAL_PERSON_ERROR,
  DELETE_LEGAL_PERSON_REQUEST,
  DELETE_LEGAL_PERSON_SUCCESS,
  DELETE_LEGAL_PERSON_ERROR,
} from '../actions';

// Получение справочника юр. лиц
const getLegalPersonRequested = () => ({
  type: GET_LEGAL_PERSON_REQUEST,
});

const getLegalPersonSuccess = (responseData) => ({
  type: GET_LEGAL_PERSON_SUCCESS,
  payload: responseData,
});

const getLegalPersonError = (error) => ({
  type: GET_LEGAL_PERSON_ERROR,
  payload: error,
});

const getLegalPersonRequest = async (id) => {
  const params = {
    id
  }
  return axios.get(`reference/legalPerson`, { params }).then((response) => response.data);
};

const getLegalPerson = (id) => (dispatch) => {
  dispatch(getLegalPersonRequested());
  return getLegalPersonRequest(id)
    .then((data) => dispatch(getLegalPersonSuccess(data)))
    .catch((error) => dispatch(getLegalPersonError(error)));
};

// Добавление юр. лица
const addLegalPersonRequested = () => ({
  type: ADD_LEGAL_PERSON_REQUEST,
});

const addLegalPersonSuccess = (responseData) => ({
  type: ADD_LEGAL_PERSON_SUCCESS,
  payload: responseData,
});

const addLegalPersonError = (error) => ({
  type: ADD_LEGAL_PERSON_ERROR,
  payload: error,
});

const addLegalPersonRequest = async (values) => {
  const params = {
    values
  }
  return axios.post(`reference/legalPerson`, { params }).then((response) => response.data);
};

const addLegalPerson = (values) => (dispatch) => {
  dispatch(addLegalPersonRequested());
  return addLegalPersonRequest(values)
    .then((data) => {
      dispatch(addLegalPersonSuccess(data));
      return 'Юр. лицо добавлено';
    })
    .catch((error) => {
      dispatch(addLegalPersonError(error));
      return error;
    });
};

// Изменение юр. лица
const editLegalPersonRequested = () => ({
  type: EDIT_LEGAL_PERSON_REQUEST,
});

const editLegalPersonSuccess = (data) => ({
  type: EDIT_LEGAL_PERSON_SUCCESS,
  payload: data,
});

const editLegalPersonError = (error) => ({
  type: EDIT_LEGAL_PERSON_ERROR,
  payload: error,
});

const editLegalPersonRequest = async (values) => {
  const params = {
    values
  }
  return axios.put(`reference/legalPerson`, { params }).then((response) => response.data);
};

const editLegalPerson = (values) => (dispatch) => {
  dispatch(editLegalPersonRequested());
  return editLegalPersonRequest(values)
    .then((values) => {
      dispatch(editLegalPersonSuccess(values));
      return 'Данные успешно изменены';
    })
    .catch((error) => {
      dispatch(editLegalPersonError(error));
      throw error;
    });
};

// Удаление юр. лица
const deleteLegalPersonRequested = () => ({
  type: DELETE_LEGAL_PERSON_REQUEST,
});

const deleteLegalPersonSuccess = (responseData) => ({
  type: DELETE_LEGAL_PERSON_SUCCESS,
  payload: responseData,
});

const deleteLegalPersonError = (error) => ({
  type: DELETE_LEGAL_PERSON_ERROR,
  payload: error,
});

const deleteLegalPersonRequest = async (id) => {
  return axios.delete('reference/legalPerson', {
    params: {
      id
    }
  }).then((response) => response.data);
};

const deleteLegalPerson = (values) => (dispatch) => {
  dispatch(deleteLegalPersonRequested());
  return deleteLegalPersonRequest(values)
    .then((values) => {
      dispatch(deleteLegalPersonSuccess(values));
      return 'Юр. лицо удалено';
    })
    .catch((error) => {
      dispatch(deleteLegalPersonError(error));
      throw error;
    });
};



export { getLegalPerson, addLegalPerson, editLegalPerson, deleteLegalPerson };
