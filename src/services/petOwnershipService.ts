import { PetOwnershipDataService } from '@data/index';

import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse
} from './serviceContracts';

export class PetOwnershipService {
  constructor(private readonly petOwnershipDataService: PetOwnershipDataService) {}

  public savePetOwnership(
    request: ISaveRequest<IPetOwnershipModel>
  ): Promise<ISaveResponse<IPetOwnershipModel>> {
    return this.petOwnershipDataService
      .savePetOwnership(request)
      .then(res => res as ISaveResponse<IPetOwnershipModel>);
  }

  public getPetOwnerships(
    request: IGetRequest<IPetOwnershipModel>
  ): Promise<IGetResponse<IPetOwnershipModel>> {
    return this.petOwnershipDataService
      .getPetOwnerships(request)
      .then(res => res as IGetResponse<IPetOwnershipModel>);
  }
}

export interface IPetOwnershipModel {
  id?: number;
}
