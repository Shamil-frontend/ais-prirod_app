/* eslint-disable no-await-in-loop */
import React from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

const useAddFiles = (addItemAction, getItemsAction) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addFilesRequest = async (values) => {
    const { files } = values;
    const results = [];
    const notUploadedFiles = files.filter((it) => it.status !== 'success');

    for (let i = 0; i < notUploadedFiles.length; i += 1) {
      notUploadedFiles[i].status = 'uploading';

      const vals = {
        ...values,
        dropitem: notUploadedFiles[i],
      };

      if (i === 1 || i === 2) {
        vals.dropitem = null;
      }

      const result = await dispatch(addItemAction(vals))
        .then(() => {
          notUploadedFiles[i].status = 'success';
          return notUploadedFiles[i];
        })
        .catch((error) => {
          notUploadedFiles[i].status = 'error';
          return error;
        });

      results.push(result);
    }

    return results;
  };

  const addFiles = async (values) => {
    return addFilesRequest(values)
      .then((data) => {
        const isNotAllFilesUploaded = data.some((it) => it instanceof Error);

        if (isNotAllFilesUploaded) {
          toast.error('Некоторые файлы не удалось загрузить');
        } else {
          toast.success('Все файлы успешно добавлены');
          closeModal();
        }

        dispatch(getItemsAction());
      })
      .catch((error) => toast.error(error.message));
  };

  return [isModalOpen, openModal, closeModal, addFiles];
};

export default useAddFiles;
