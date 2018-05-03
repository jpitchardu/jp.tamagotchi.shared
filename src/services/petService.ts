import { PetDataService } from '../data/index';

import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse
} from './serviceContracts';

export class PetService {
  constructor(private readonly petDataService: PetDataService) {}

  public savePet(
    request: ISaveRequest<IPetModel>
  ): Promise<ISaveResponse<IPetModel>> {
    return this.petDataService
      .savePet(request)
      .then(res => res);
  }

  public getPets(
    request: IGetRequest<IPetModel>
  ): Promise<IGetResponse<IPetModel>> {
    return this.petDataService
      .getPets(request)
      .then(res => res);
  }
}

export interface IPetModel {
  id?: number;
  image: string;
  name: string;
  description: string;
  package: string;
}
