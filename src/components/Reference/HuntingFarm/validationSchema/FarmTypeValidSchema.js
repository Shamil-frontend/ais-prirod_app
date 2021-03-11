import { object, string, number, date } from 'yup';

const FarmTypeValidSchema = object().shape({
  huntingFarmId: string().required(),
  seasonId: string().required(),
  huntingTypeId: string().required(),
  methodRemoveId: string().required(),
  serialForm: string().required(),
  numberForm: string().required(),
  fioGiven: string().required(),
  jobPosName: string().required(),
  dateGiven: date().nullable().required(),
  tariff: number().required(),
  charge: number().required(),
});

export default FarmTypeValidSchema;
