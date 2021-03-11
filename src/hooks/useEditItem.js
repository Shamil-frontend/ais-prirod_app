import React from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

const useEditItem = (editItemAction, getItemsAction, onModalClose) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const openModal = React.useCallback(() => setIsModalOpen(true), []);
  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
    if (onModalClose) {
      onModalClose();
    }
  }, [onModalClose]);

  const editItem = (values) => {
    dispatch(editItemAction(values))
      .then((response) => {
        toast.success(response);
        closeModal();
        if (getItemsAction) {
          dispatch(getItemsAction(values.id));
        }
      })
      .catch((error) => toast.error(error.message));
  };

  return [isModalOpen, openModal, closeModal, editItem];
};

export default useEditItem;
