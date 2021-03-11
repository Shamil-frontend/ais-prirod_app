import { combineReducers } from 'redux';

import user from './user/reducer';
import individuals from './individuals/reducer';
import huntingLicense from './huntingLicense/reducer';
import huntingPermission from './huntingPermission/reducer';
import huntingFarm from './huntingFarm/reducer';
import huntingFarmType from './huntingFarmType/reducer';
import legalPerson from './legalPerson/reducer';

const reducers = combineReducers({
  user,
  individuals,
  huntingLicense,
  huntingPermission,
  huntingFarm,
  huntingFarmType,
  legalPerson,
});

export default reducers;


