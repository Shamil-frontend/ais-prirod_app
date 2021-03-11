const fieldTypesMap = {
  number: 'цифры',
};

const validationSchemaLocale = {
  mixed: {
    required: 'Обязательное поле',
    notType: ({ type }) => `Поле может содержать только ${fieldTypesMap[type]}`,
  },
  string: {
    min: ({ min }) => `Поле должно состоять минимум из ${min} символов`,
    email: 'Невалидный e-mail',
    url: 'Невалидный url',
  },
  number: {
    min: ({ min }) => `Значение поля должно быть не менее ${min}`,
    max: ({ max }) => `Значение поля должно быть не более ${max}`,
    positive: 'Значение поля не может быть отрицательным',
  },
};

export default validationSchemaLocale;
