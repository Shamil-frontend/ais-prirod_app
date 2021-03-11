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

const INIT_STATE = {

  huntingFarmData: [],
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

    // Получение охот. угодий
    case GET_HUNTING_FARM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_HUNTING_FARM_SUCCESS:
      return {
        ...state,
        huntingFarmData: action.payload,
        loading: false,
      };

    case GET_HUNTING_FARM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Добавление охот. угодий
    case ADD_HUNTING_FARM_REQUEST:
      return {
        ...state,
        adding: true,
        errorAdding: null,
      };

    case ADD_HUNTING_FARM_SUCCESS:
      return {
        ...state,
        addedItem: action.payload,
        adding: false,
      };

    case ADD_HUNTING_FARM_ERROR:
      return {
        ...state,
        adding: false,
        errorAdding: action.payload,
      };

    // Изменение охот. угодий
    case EDIT_HUNTING_FARM_REQUEST:
      return {
        ...state,
        editing: true,
        errorEditing: null,
      };

    case EDIT_HUNTING_FARM_SUCCESS:
      return {
        ...state,
        editItem: action.payload,
        editing: false,
      };

    case EDIT_HUNTING_FARM_ERROR:
      return {
        ...state,
        editing: false,
        errorEditing: action.payload,
      };

    // Удаление охот. угодий
    case DELETE_HUNTING_FARM_REQUEST:
      return {
        ...state,
        deleting: true,
        errorDeleting: null,
      };

    case DELETE_HUNTING_FARM_SUCCESS:
      return {
        ...state,
        deletedItem: action.payload,
        deleting: false,
      };

    case DELETE_HUNTING_FARM_ERROR:
      return {
        ...state,
        deleting: false,
        errorDeleting: action.payload,
      };

    default:
      return state;
  }
};
