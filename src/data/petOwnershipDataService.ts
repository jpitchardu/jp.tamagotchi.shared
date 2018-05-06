import { promisify } from '@utils/index';

import {
  IGetDataRequest,
  IGetDataResponse,
  ISaveDataRequest,
  ISaveDataResponse
} from './dataContracts';

/**
 * @description PetOwnership Client Service for Data Layer
 * @author jpichardo
 */
export class PetOwnershipDataService {
  
  constructor(private readonly petOwnershipDataClient) {}

  /**
   * @param  {ISaveDataRequest<IPetOwnershipDataModel>} request
   * @returns {Promise<ISaveDataResponse<IPetOwnershipDataModel>>} The response from the data service
   */
  public savePetOwnership(
    request: ISaveDataRequest<IPetOwnershipDataModel>
  ): Promise<ISaveDataResponse<IPetOwnershipDataModel>> {
    return this.petOwnershipDataClient
      .savePetOwnership(request)
      .then(res => res as ISaveDataResponse<IPetOwnershipDataModel>);
  }

  /**
   * @param  {IGetDataRequest<IPetOwnershipDataModel>} request
   * @returns {Promise<IGetDataResponse<IPetOwnershipDataModel>>} The response from the data service
   */
  public getPetOwnerships(
    request: IGetDataRequest<IPetOwnershipDataModel>
  ): Promise<IGetDataResponse<IPetOwnershipDataModel>> {
    return this.petOwnershipDataClient
      .getPetOwnerships(request)
      .then(res => res as IGetDataResponse<IPetOwnershipDataModel>);
  }
}

export interface IPetOwnershipDataModel {
  id?: number;
}
