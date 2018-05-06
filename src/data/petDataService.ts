/**
 * @description Pet Client Service for Data Layer
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
 * @description Pet Client Service for Data Layer
 * @author jpichardo
 */
export class PetDataService {
  
  constructor(private readonly petDataClient) {}
  
  /**
   * @param  {ISaveDataRequest<IPetDataModel>} request
   * @returns {Promise<ISaveDataResponse<IPetDataModel>>} The response from the service
   */
  public savePet(
    request: ISaveDataRequest<IPetDataModel>
  ): Promise<ISaveDataResponse<IPetDataModel>> {
    return this.petDataClient
      .savePet(request)
      .then(res => res as ISaveDataResponse<IPetDataModel>);
  }
  /**
   * @param  {IGetDataRequest<IPetDataModel>} request
   * @returns {Promise<IGetDataResponse<IPetDataModel>>} The response from the service
   */
  public getPets(
    request: IGetDataRequest<IPetDataModel>
  ): Promise<IGetDataResponse<IPetDataModel>> {
    return this.petDataClient
      .getPets(request)
      .then(res => res as IGetDataResponse<IPetDataModel>);
  }
}

export interface IPetDataModel {
  id?: number;
  image: string;
  name: string;
  description: string;
  package: string;
}
