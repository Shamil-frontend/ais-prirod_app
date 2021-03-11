import formatISO from 'date-fns/formatISO';

const isDateField = (field) => field instanceof Date;
const isFileField = (field) => field instanceof File;
const isArray = (field) => field instanceof Array;
const isObject = (field) => field !== null && !isArray(field) && typeof field === 'object';
const isSelectField = (field) => Object.prototype.hasOwnProperty.call(field, 'label');

const objectToFormData = (values) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value || value === 0) {
      if (isDateField(value)) {
        formData.set(key, formatISO(value));
      } else if (isObject(value)) {
        if (isSelectField(value)) {
          formData.set(key, value.value);
        } else if (isFileField(value)) {
          formData.set(key, value);
        } else {
          Object.entries(value).forEach(([childKey, childValue]) => {
            if (childValue) {
              if (isDateField(childValue)) {
                formData.set(`${key}.${childKey}`, formatISO(childValue));
              } else {
                formData.set(`${key}.${childKey}`, childValue);
              }
            }
          });
        }
      } else if (isArray(value)) {
        value.forEach(({ id }, idx) => formData.set(`${key}[${idx}]`, id));
      } else {
        formData.set(key, value);
      }
    }
  });

  return formData;
};

export default objectToFormData;
