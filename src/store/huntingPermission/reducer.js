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

const INIT_STATE = {

  huntingPermData: null,
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

    // Получение списка разрешений на охоту
    case GET_HUNTING_PERMISSION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_HUNTING_PERMISSION_SUCCESS:
      return {
        ...state,
        huntingPermData: action.payload,
        loading: false,
      };

    case GET_HUNTING_PERMISSION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Добавление разрешения на охоту
    case ADD_HUNTING_PERMISSION_REQUEST:
      return {
        ...state,
        adding: true,
        errorAdding: null,
      };

    case ADD_HUNTING_PERMISSION_SUCCESS:
      return {
        ...state,
        addedItem: action.payload,
        adding: false,
      };

    case ADD_HUNTING_PERMISSION_ERROR:
      return {
        ...state,
        adding: false,
        errorAdding: action.payload,
      };

    // Изменение разрешения на охоту
    case EDIT_HUNTING_PERMISSION_REQUEST:
      return {
        ...state,
        editing: true,
        errorEditing: null,
      };

    case EDIT_HUNTING_PERMISSION_SUCCESS:
      return {
        ...state,
        editItem: action.payload,
        editing: false,
      };

    case EDIT_HUNTING_PERMISSION_ERROR:
      return {
        ...state,
        editing: false,
        errorEditing: action.payload,
      };

    // Удаление разрешения на охоту
    case DELETE_HUNTING_PERMISSION_REQUEST:
      return {
        ...state,
        deleting: true,
        errorDeleting: null,
      };

    case DELETE_HUNTING_PERMISSION_SUCCESS:
      return {
        ...state,
        deletedItem: action.payload,
        deleting: false,
      };

    case DELETE_HUNTING_PERMISSION_ERROR:
      return {
        ...state,
        deleting: false,
        errorDeleting: action.payload,
      };

    default:
      return state;
  }
};
