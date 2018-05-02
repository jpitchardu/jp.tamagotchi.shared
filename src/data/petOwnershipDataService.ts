import { promisify } from '../utils/index';
import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse
} from './dataContracts';

export class PetOwnershipDataService {
  constructor(private readonly petOwnershipDataClient) {}

  public savePetOwnership(
    request: ISaveRequest<IPetOwnershipModel>
  ): Promise<ISaveResponse<IPetOwnershipModel>> {
    return this.petOwnershipDataClient
      .savePetOwnership(request)
      .then(res => res as ISaveResponse<IPetOwnershipModel>);
  }

  public getPetOwnerships(
    request: IGetRequest<IPetOwnershipModel>
  ): Promise<IGetResponse<IPetOwnershipModel>> {
    return this.petOwnershipDataClient
      .getPetOwnerships(request)
      .then(res => res as IGetResponse<IPetOwnershipModel>);
  }
}

export interface IPetOwnershipModel {
  id?: number;
}
