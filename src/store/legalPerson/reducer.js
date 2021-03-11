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

const INIT_STATE = {

  legalPersonData: [],
  loading: true,
  error: null,

  addedItem: null,
  adding: false,
  errorAdding: null,

  editItem: null,
  editing: false,
  errorEditing: null,

  deletedItem: null,
  deleting: true,
  errorDeleting: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    // Получение списка юр. лиц
    case GET_LEGAL_PERSON_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_LEGAL_PERSON_SUCCESS:
      return {
        ...state,
        legalPersonData: action.payload,
        loading: false,
      };

    case GET_LEGAL_PERSON_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Добавление юр. лица
    case ADD_LEGAL_PERSON_REQUEST:
      return {
        ...state,
        adding: true,
        errorAdding: null,
      };

    case ADD_LEGAL_PERSON_SUCCESS:
      return {
        ...state,
        addedItem: action.payload,
        adding: false,
      };

    case ADD_LEGAL_PERSON_ERROR:
      return {
        ...state,
        adding: false,
        errorAdding: action.payload,
      };

    // Изменение юр. лица
    case EDIT_LEGAL_PERSON_REQUEST:
      return {
        ...state,
        editing: true,
        errorEditing: null,
      };

    case EDIT_LEGAL_PERSON_SUCCESS:
      return {
        ...state,
        editItem: action.payload,
        editing: false,
      };

    case EDIT_LEGAL_PERSON_ERROR:
      return {
        ...state,
        editing: false,
        errorEditing: action.payload,
      };

    // Удаление юр. лица
    case DELETE_LEGAL_PERSON_REQUEST:
      return {
        ...state,
        deleting: true,
        errorDeleting: null,
      };

    case DELETE_LEGAL_PERSON_SUCCESS:
      return {
        ...state,
        deletedItem: action.payload,
        deleting: false,
      };

    case DELETE_LEGAL_PERSON_ERROR:
      return {
        ...state,
        deleting: false,
        errorDeleting: action.payload,
      };

    default:
      return state;
  }
};
