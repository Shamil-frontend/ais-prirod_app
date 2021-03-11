import React from 'react';
import { string, func } from 'prop-types';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import getFileNameAndExt from '../../../utils/getFileNameAndExt';

const FileName = ({ fileName, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [initialName, setInitialName] = React.useState(null);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    const text = getFileNameAndExt(fileName);

    setInitialName(text);
    setValue(text.name);
  }, [fileName]);

  const saveChanges = (value) => {
    const { name, ext } = initialName;

    if (value.length && value !== name) {
      onEdit(`${value}.${ext}`);
      setIsEditing(false);
    } else {
      setIsEditing(false);
      setValue(initialName.name);
    }
  };

  const onKeyDown = (evt) => {
    const {
      key,
      target: { value },
    } = evt;

    if (key === 'Enter') {
      saveChanges(value);
    }

    if (key === 'Escape') {
      evt.preventDefault();
      setIsEditing(false);
      setValue(initialName.name);
    }
  };

  return isEditing ? (
    <InputGroup size="sm">
      <FormControl
        type="text"
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        onKeyDown={(evt) => onKeyDown(evt)}
        onBlur={(evt) => saveChanges(evt.target.value)}
        autoFocus
      />
      <InputGroup.Append>
        <InputGroup.Text>.{initialName.ext}</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  ) : (
    <div>
      <Button className="btn-file-name" variant="link" onClick={() => setIsEditing(true)}>
        <span className="text-truncate">{fileName}</span>
      </Button>
    </div>
  );
};

FileName.propTypes = {
  fileName: string.isRequired,
  onEdit: func.isRequired,
};

export default FileName;
