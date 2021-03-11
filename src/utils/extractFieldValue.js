const extractFieldValue = (field) => {
  if (typeof field === 'string') {
    return field.toLowerCase();
  }

  if (typeof field === 'number') {
    return field;
  }

  if (!field) {
    return '';
  }

  if (typeof field === 'object') {
    return field.value.toLowerCase();
  }

  return field;
};

export default extractFieldValue;
