import { PetOwnershipDataService } from '@data/index';

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

export class PetOwnershipService {
  constructor(
    private readonly petOwnershipDataService: PetOwnershipDataService,
    private readonly validate: validateFn
  ) {}

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

  private makeRequest<TReq extends object, TRes extends IDataResponse>(
    request: TReq,
    fn: (t: TReq) => Promise<TRes>
  ) {
    return this.validate(request)
      .then(() => fn(request))
      .then(res => ({ successful: true, data: res.data, message: '' }))
      .catch(err => ({ message: err.toString(), successful: false }));
  }
}

export interface IPetOwnershipModel {
  id?: number;
}
