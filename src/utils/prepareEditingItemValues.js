const prepareEditingItemValues = (data, initialValues) => {
  const values = {
    id: data.id,
  };

  Object.keys(initialValues).forEach((key) => {
    if (data[key] !== null) {
      values[key] = data[key];
    }
  });

  return values;
};

export default prepareEditingItemValues;
