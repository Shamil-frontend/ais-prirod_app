/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { useField } from 'formik';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import Tooltip from '../Tooltip';
import Icon from '../Icon';

import FileName from './FileName';

import formatBytes from '../../../utils/formatBytes';
import getFileNameAndExt from '../../../utils/getFileNameAndExt';
import truncateString from '../../../utils/truncateString';
import makeFilePreview from '../../../utils/makeFilePreview';

import './CustomDropzone.scss';

const MAX_FILE_SIZE = 5242880;

const CustomDropzone = ({ name, acceptedFileTypes, multiple, maxSize, maxFiles, isDisabled }) => {
  const [field, meta, helpers] = useField(name);

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      const dropitems = acceptedFiles.map((it, idx) => ({
        id: idx,
        file: it,
        name: it.name,
        preview: makeFilePreview(it),
        status: 'dropped',
      }));

      return helpers.setValue(dropitems);
    },
    [helpers]
  );

  const onDropRejected = React.useCallback(
    (arr) => {
      const tooManyFiles = arr.some(({ errors }) =>
        errors.some(({ code }) => code === 'too-many-files')
      );

      if (tooManyFiles) {
        return toast.warn(`Максимум ${maxFiles} файлов`);
      }

      return arr.forEach(({ errors, file }) => {
        const { name, ext } = getFileNameAndExt(file.name);
        const fileName = `${truncateString(name, 18)}.${ext}`;

        errors.forEach(({ code }) => {
          if (code === 'file-invalid-type') {
            toast.warn(`Формат файла "${fileName}" не поддерживается`);
          } else if (code === 'file-too-large') {
            toast.warn(
              `У файла "${fileName}" превышен максимально допустимый размер: ${formatBytes(
                maxSize
              )}`
            );
          }
        });
      });
    },
    [maxFiles, maxSize]
  );

  const onNameChange = React.useCallback(
    (id, newName) => {
      const dropItemIndex = field.value.findIndex((it) => it.id === id);

      const updatedDropitem = {
        ...field.value[dropItemIndex],
        name: newName,
      };

      const updatedDropitems = [
        ...field.value.slice(0, dropItemIndex),
        updatedDropitem,
        ...field.value.slice(dropItemIndex + 1),
      ];

      return helpers.setValue(updatedDropitems);
    },
    [field.value, helpers]
  );

  const onDeleteClick = React.useCallback(
    (id) => {
      const updatedDropitems = field.value.filter((it) => it.id !== id);
      return helpers.setValue(updatedDropitems);
    },
    [field.value, helpers]
  );

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple,
    maxSize,
    maxFiles,
    disabled: isDisabled,
    onDropRejected,
  });

  let classNames = 'custom-dropzone';

  if (isDragActive) {
    classNames += ' is-active';
  }

  if (meta.touched && meta.error) {
    classNames += ' is-invalid';
  }

  return (
    <div className={classNames}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps({ name })} />
        {!field.value.length && (
          <div className="dropzone-text">
            <h3>Перетяните файлы в эту область</h3>
            <p>Или нажмите на эту область для добавления файлов</p>
          </div>
        )}
      </div>
      <FormControl.Feedback className="invalid-tooltip" type="invalidd">
        {meta.error}
      </FormControl.Feedback>
      <Row className="dropzone-files">
        {field.value.map(({ id, preview, status, file, name }) => (
          <Col md="6" lg="4" key={id}>
            <Card className="dropzone-file">
              <div className="dropzone-file-left">
                <img src={preview} alt={name} />
                <i className={`file-upload-status ${status}`} />
              </div>
              <Card.Body>
                {status !== 'success' ? (
                  <FileName fileName={name} onEdit={(value) => onNameChange(id, value)} />
                ) : (
                  <div className="text-truncate text-muted">{name}</div>
                )}

                <small>{formatBytes(file.size)}</small>
                {status !== 'success' && (
                  <Tooltip title="Удалить" placement="left">
                    <Button
                      className="btn-delete"
                      variant="icon danger"
                      onClick={() => onDeleteClick(id)}
                    >
                      <Icon name="remove" width="16px" height="16px" />
                    </Button>
                  </Tooltip>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

CustomDropzone.defaultProps = {
  isDisabled: false,
  multiple: true,
  acceptedFileTypes:
    'image/*, application/pdf, application/msword, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/rtf, text/rtf',
  maxSize: MAX_FILE_SIZE,
  maxFiles: 5,
};

CustomDropzone.propTypes = {
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  acceptedFileTypes: PropTypes.string,
  maxSize: PropTypes.number,
  maxFiles: PropTypes.number,
  isDisabled: PropTypes.bool,
};

export default CustomDropzone;
