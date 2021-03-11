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

const INIT_STATE = {
  addSearchText: '',

  individualsList: null,
  loading: false,
  error: null,

  individualData: null,
  loadingData: true,
  errorData: null,

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

    case SET_SEARCH_INDIVIDUALS:
      return {
        ...state,
        addSearchText: action.payload,
      };

    // Получение списка Физ. лиц по поиску
    case GET_SEARCH_INDIVIDUALS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_SEARCH_INDIVIDUALS_SUCCESS:
      return {
        ...state,
        individualsList: action.payload,
        loading: false,
      };

    case GET_SEARCH_INDIVIDUALS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Получение данных Физ. лица по его ID
    case GET_INDIVIDUAL_DATA_REQUEST:
      return {
        ...state,
        loadingData: true,
        errorData: null,
      };

    case GET_INDIVIDUAL_DATA_SUCCESS:
      return {
        ...state,
        individualData: action.payload,
        loadingData: false,
      };

    case GET_INDIVIDUAL_DATA_ERROR:
      return {
        ...state,
        loadingData: false,
        errorData: action.payload,
      };

    // Добавление ФЛ
    case INDIVIDUALS_ADD_REQUEST:
      return {
        ...state,
        adding: true,
        errorAdding: null,
      };

    case INDIVIDUALS_ADD_SUCCESS:
      return {
        ...state,
        addedItem: action.payload,
        adding: false,
      };

    case INDIVIDUALS_ADD_ERROR:
      return {
        ...state,
        adding: false,
        errorAdding: action.payload,
      };

    // Обновление
    case INDIVIDUALS_EDIT_REQUEST:
      return {
        ...state,
        editing: true,
        errorEditing: null,
      };

    case INDIVIDUALS_EDIT_SUCCESS:
      return {
        ...state,
        editItem: action.payload,
        editing: false,
      };

    case INDIVIDUALS_EDIT_ERROR:
      return {
        ...state,
        editing: false,
        errorEditing: action.payload,
      };

    // Удаление ФЛ
    case INDIVIDUALS_DELETE_REQUEST:
      return {
        ...state,
        deleting: true,
        errorDeleting: null,
      };

    case INDIVIDUALS_DELETE_SUCCESS:
      return {
        ...state,
        deletedItem: action.payload,
        deleting: false,
      };

    case INDIVIDUALS_DELETE_ERROR:
      return {
        ...state,
        deleting: false,
        errorDeleting: action.payload,
      };

    default:
      return state;
  }
};
