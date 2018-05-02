import { promisify } from '../utils/index';

import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse
} from './dataContracts';

export class PetDataService {
  constructor(private readonly petDataClient) {}

  public savePet(
    request: ISaveRequest<IPetModel>
  ): Promise<ISaveResponse<IPetModel>> {
    return this.petDataClient
      .savePet(request)
      .then(res => res as ISaveResponse<IPetModel>);
  }

  public getPets(
    request: IGetRequest<IPetModel>
  ): Promise<IGetResponse<IPetModel>> {
    return this.petDataClient
      .getPets(request)
      .then(res => res as IGetResponse<IPetModel>);
  }
}

export interface IPetModel {
  id?: number;
  image: string;
  name: string;
  description: string;
  package: string;
}
