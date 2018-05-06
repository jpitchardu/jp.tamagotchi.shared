/**
 * @description User Client Service for Data Layer
 * @author jpichardo
 */

import { promisify } from '@utils/index';

import {
  IGetDataRequest,
  IGetDataResponse,
  ISaveDataRequest,
  ISaveDataResponse
} from './dataContracts';

/**
 * @description User Client Service for Data Layer
 * @author jpichardo
 */
export class UserDataService {
  
  constructor(private readonly userDataClient) {}
  
  /**
   * @param  {ISaveDataRequest<IUserDataModel>} request
   * @returns {Promise<ISaveDataResponse<IUserDataModel>>} The response from the data server
   */
  public saveUser(
    request: ISaveDataRequest<IUserDataModel>
  ): Promise<ISaveDataResponse<IUserDataModel>> {
    return this.userDataClient
      .saveUser(request)
      .then(res => res as ISaveDataResponse<IUserDataModel>);
  }
  /**
   * @param  {IGetDataRequest<IUserDataModel>} request
   * @returns {Promise<IGetDataResponse<IUserDataModel>>} The response from the data server
   */
  public getUsers(
    request: IGetDataRequest<IUserDataModel>
  ): Promise<IGetDataResponse<IUserDataModel>> {
    return this.userDataClient
      .getUsers(request)
      .then(res => res as IGetDataResponse<IUserDataModel>);
  }
}

export interface IUserDataModel {
  id?: number;
  userName: string;
  password: string;
  email: string;
}
