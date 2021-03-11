import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import { toast } from 'react-toastify';

import Icon from '../Icon';
import formatBytes from '../../../utils/formatBytes';

import userPic from '../../../images/user.svg';

import './CustomPhotoField.scss';

const CustomPhotoField = ({ name, preview, width, height, label, formats, size, isDisabled }) => {
  const [filePreview, setFilePreview] = React.useState(preview);
  const [field, meta, helpers] = useField(name);

  let classNames = 'custom-photo-field';

  if (field.value || field.value === 0) {
    classNames += ' file-attached';
  }

  if (meta.touched && meta.error) {
    classNames += ' is-invalid';
  }

  const onChange = (evt) => {
    const file = evt.target.files[0];

    if (file) {
      if (file.size > size) {
        toast.error(`Максимально допустимый размер файла: ${formatBytes(size)}`);
      } else {
        helpers.setValue(file);

        const reader = new FileReader();

        reader.onloadend = () => {
          setFilePreview(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <label className={classNames} htmlFor={field.id} title={label}>
      <input
        type="file"
        id={field.id}
        name={field.name}
        onChange={onChange}
        onBlur={field.onBlur}
        disabled={isDisabled}
        accept={formats.join(',')}
      />
      <img src={filePreview} width={width} height={height} alt={label} />
      <Icon name="camera" width="60px" height="47px" />
    </label>
  );
};

CustomPhotoField.defaultProps = {
  preview: userPic,
  width: 120,
  height: 120,
  label: 'Файл',
  formats: ['image/jpg', 'image/jpeg', 'image/png'],
  size: 5242880,
  isDisabled: false,
};

CustomPhotoField.propTypes = {
  name: PropTypes.string.isRequired,
  preview: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  formats: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.number,
  isDisabled: PropTypes.bool,
};

export default CustomPhotoField;
