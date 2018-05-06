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

/**
 * @description PetOwnership GRPC Service implementation
 * @author jpichardo
 */
export class PetOwnershipService extends SharedService {
  /**
   * @param  {PetOwnershipDataService} privatereadonlypetOwnershipDataService
   * @param  {validateFn} protectedreadonlyvalidate
   */
  constructor(
    private readonly petOwnershipDataService: PetOwnershipDataService,
    protected readonly validate: validateFn
  ) {
    super(validate);
  }

  /**
   * @param  {SaveRequest<IPetOwnershipModel>} request
   * @returns {Promise<SaveResponse<IPetOwnershipModel>>} response
   */
  public savePetOwnership(
    request: SaveRequest<IPetOwnershipModel>
  ): Promise<SaveResponse<IPetOwnershipModel>> {
    return this.makeRequest(request, req =>
      this.petOwnershipDataService.savePetOwnership(req)
    );
  }

  /**
   * @param  {GetRequest<IPetOwnershipModel>} request
   * @returns {Promise<GetResponse<IPetOwnershipModel>>} response
   */
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
