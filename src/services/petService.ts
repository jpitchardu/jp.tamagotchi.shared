import { PetDataService } from '@data/index';
import { SharedService } from '@services/sharedService';
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

/**
 * @description PetOwnership GRPC Service implementation
 * @extends SharedService
 * @author jpichardo
 */
export class PetService extends SharedService {
  /**
   * @param  {PetDataService} privatereadonlypetDataService
   * @param  {validateFn} protectedreadonlyvalidate
   */
  constructor(
    private readonly petDataService: PetDataService,
    protected readonly validate: validateFn
  ) {
    super(validate);
  }

  /**
   * @param  {SaveRequest<PetModel>} request
   * @returns {Promise<SaveResponse<PetModel>>} response
   */
  public savePet(
    request: SaveRequest<PetModel>
  ): Promise<SaveResponse<PetModel>> {
    return this.makeRequest(request, req => this.petDataService.savePet(req));
  }

  /**
   * @param  {GetRequest<PetModel>} request
   * @returns {Promise<GetResponse<PetModel>>} response
   */
  public getPets(
    request: GetRequest<PetModel>
  ): Promise<GetResponse<PetModel>> {
    return this.makeRequest(request, req => this.petDataService.getPets(req));
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
