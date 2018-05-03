import { promisify } from '../utils/index';
import {
  IGetDataRequest,
  IGetDataResponse,
  ISaveDataRequest,
  ISaveDataResponse
} from './dataContracts';

export class PetOwnershipDataService {
  constructor(private readonly petOwnershipDataClient) {}

  public savePetOwnership(
    request: ISaveDataRequest<IPetOwnershipDataModel>
  ): Promise<ISaveDataResponse<IPetOwnershipDataModel>> {
    return this.petOwnershipDataClient
      .savePetOwnership(request)
      .then(res => res as ISaveDataResponse<IPetOwnershipDataModel>);
  }

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
