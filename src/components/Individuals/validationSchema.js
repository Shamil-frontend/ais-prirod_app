import { object, string, date, boolean } from 'yup';

const validationSchema = object().shape({
  lastName: string().required(),
  firstName: string().required(),
  middleName: string(),
  birthDate: date().nullable().required(),
  birthPlace: string().required(),
  identityDocument: object().shape({
    serial: string().required(),
    number: string().required(),
    issueDate: date().nullable().required(),
    issuePlace: string().required(),
    code: string().required(),
    addressRegistration: string().required(),
  }),
  addressLiving: string().required(),
  phoneNumber1: string().required(),
  phoneNumber2: string(),
  email: string().email(),
  snils: string().required().required(),
  inn: string().required().required(),
  gender: string().required(),
  photo: object().nullable(),
  orgName: string(),
  orgAddress: string(),
  orgEmail: string().email(),
  orgPhone: string(),
  legalForm: string(),
  isLicenseVisible: boolean(),
  huntingLicenseData: object().when('isLicenseVisible', {
    is: (isLicenseVisible) => isLicenseVisible,
    then: object().shape({
      serialLicense: string().required(),
      numberLicense: string().required(),
      issueDate: date().nullable().required(),
      employeesAuthorized: string().required(),
      issued: string().required(),
      reestrDate: date().nullable().required(),
    }),
  }),
});

export default validationSchema;
