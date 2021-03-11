import { object, string, number } from 'yup';

const FarmValidSchema = object().shape({
  name: string().required(),
  area: number().min(1).required(),
  huntingFarmTypeId: object().nullable().required(),
  legalPersonId: object().nullable().required(),
  address: string(),
  description: string(),
  commentt: string(),
});

export default FarmValidSchema;
