import { PetDataService } from '@data/index';
import { Matches, MinLength } from 'class-validator';

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

export class PetService {
  constructor(
    private readonly petOwnershipDataService: PetDataService,
    private readonly validate: validateFn
  ) {}

  public savePet(
    request: ISaveRequest<PetModel>
  ): Promise<ISaveResponse<PetModel>> {
    return this.makeRequest(request, req =>
      this.petOwnershipDataService.savePet(req)
    );
  }

  public getPets(
    request: IGetRequest<PetModel>
  ): Promise<IGetResponse<PetModel>> {
    return this.makeRequest(request, req =>
      this.petOwnershipDataService.getPets(req)
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

export class PetModel {
  public id?: number;
  @Matches(/^(?:\/[^\/#?]+)+\.(?:jpg|gif|png)$/, {
    message: 'Image path is not valid'
  })
  public image: string;
  @MinLength(10)
  public name: string;
  @MinLength(30)
  public description: string;
  @Matches(/^(?:\/[^\/#?]+)+\.(?:cs|jar|ts|js)$/, {
    message: 'Package path is not valid'
  })
  public package: string;
}
