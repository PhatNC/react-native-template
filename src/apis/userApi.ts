import utils from '../utils/apiUtils';
import AppConfigs from './config';

const {END_POINT_CORE} = AppConfigs;

export const apiGetUserInfo = (params: any) => {
  return utils.get(`${END_POINT_CORE}/api/users`, params);
};
