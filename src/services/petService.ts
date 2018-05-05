import { PetDataService } from '@data/index';
import { Matches, MinLength } from 'class-validator';

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

export class PetService {
  constructor(
    private readonly petDataService: PetDataService,
    private readonly validate: validateFn
  ) {}

  public savePet(
    request: SaveRequest<PetModel>
  ): Promise<SaveResponse<PetModel>> {
    return this.makeRequest(request, req =>
      this.petDataService.savePet(req)
    );
  }

  public getPets(
    request: GetRequest<PetModel>
  ): Promise<GetResponse<PetModel>> {
    return this.makeRequest(request, req =>
      this.petDataService.getPets(req)
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
