import React from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

const useAddItem = (addItemAction, getItemsAction) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addItem = (values) => {
    dispatch(addItemAction(values))
      .then((data) => {
        toast.success(data);
        closeModal();
        dispatch(getItemsAction());
      })
      .catch((error) => toast.error(error.message));
  };

  return [isModalOpen, openModal, closeModal, addItem];
};

export default useAddItem;
