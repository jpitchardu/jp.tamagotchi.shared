import {PetDataService} from '@data/index';
import {Matches, MinLength} from 'class-validator';

import {IGetRequest, IGetResponse, ISaveRequest, ISaveResponse} from './serviceContracts';

export class PetService {
  constructor(private readonly petDataService: PetDataService) {}

  public savePet(request: ISaveRequest<PetModel>):
      Promise<ISaveResponse<PetModel>> {
    return this.petDataService.savePet(request).then(res => res);
  }

  public getPets(request: IGetRequest<PetModel>):
      Promise<IGetResponse<PetModel>> {
    return this.petDataService.getPets(request).then(res => res);
  }
}

export class PetModel {
  public id?: number;
  @Matches(
      /^(?:\/[^\/#?]+)+\.(?:jpg|gif|png)$/,
      {message: 'Image path is not valid'})
  public image: string;
  @MinLength(10) public name: string;
  @MinLength(30) public description: string;
  @Matches(
      /^(?:\/[^\/#?]+)+\.(?:cs|jar|ts|js)$/,
      {message: 'Package path is not valid'})
  public package: string;
}
