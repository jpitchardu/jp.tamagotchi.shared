import { PetOwnershipDataService } from '@data/index';

import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse,
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
    request: ISaveRequest<IPetOwnershipModel>
  ): Promise<ISaveResponse<IPetOwnershipModel>> {
    return this.makeRequest(request, req =>
      this.petOwnershipDataService.savePetOwnership(req)
    );
  }

  public getPetOwnerships(
    request: IGetRequest<IPetOwnershipModel>
  ): Promise<IGetResponse<IPetOwnershipModel>> {
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
