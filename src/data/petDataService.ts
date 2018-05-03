import { promisify } from '@utils/index';

import {
  IGetDataRequest,
  IGetDataResponse,
  ISaveDataRequest,
  ISaveDataResponse
} from './dataContracts';

export class PetDataService {
  constructor(private readonly petDataClient) {}

  public savePet(
    request: ISaveDataRequest<IPetDataModel>
  ): Promise<ISaveDataResponse<IPetDataModel>> {
    return this.petDataClient
      .savePet(request)
      .then(res => res as ISaveDataResponse<IPetDataModel>);
  }

  public getPets(
    request: IGetDataRequest<IPetDataModel>
  ): Promise<IGetDataResponse<IPetDataModel>> {
    return this.petDataClient
      .getPets(request)
      .then(res => res as IGetDataResponse<IPetDataModel>);
  }
}

export interface IPetDataModel {
  id?: number;
  image: string;
  name: string;
  description: string;
  package: string;
}
