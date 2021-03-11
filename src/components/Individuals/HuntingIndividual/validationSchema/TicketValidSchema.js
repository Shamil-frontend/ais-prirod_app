import { object, string, date } from 'yup';

const TicketValidSchema = object().shape({
  serialLicense: string().required(),
  numberLicense: string().required(),
  issueDate: date().nullable().required(),
  reestrDate: date().nullable().required(),
  employeesAuthorized: string().required(),
  issued: string().required(),
  cancelledDate: date().nullable(),
  cancelledGround: string(),
});

export default TicketValidSchema;
