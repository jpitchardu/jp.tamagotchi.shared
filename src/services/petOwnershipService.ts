import { PetOwnershipDataService } from '@data/index';
import { SharedService } from '@services/sharedService';

import {
  GetRequest,
  GetResponse,
  SaveRequest,
  SaveResponse,
  validateFn
} from './serviceContracts';


interface IDataResponse {
  data: any;
}

export class PetOwnershipService extends SharedService {
  constructor(
    private readonly petOwnershipDataService: PetOwnershipDataService,
    protected readonly validate: validateFn
  ) {
    super(validate);
  }

  public savePetOwnership(
    request: SaveRequest<IPetOwnershipModel>
  ): Promise<SaveResponse<IPetOwnershipModel>> {
    return this.makeRequest(request, req =>
      this.petOwnershipDataService.savePetOwnership(req)
    );
  }

  public getPetOwnerships(
    request: GetRequest<IPetOwnershipModel>
  ): Promise<GetResponse<IPetOwnershipModel>> {
    return this.makeRequest(request, req =>
      this.petOwnershipDataService.getPetOwnerships(req)
    );
  }
}

export interface IPetOwnershipModel {
  id?: number;
}
