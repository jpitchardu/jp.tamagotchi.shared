import { PetDataService } from '../data/index';

export class PetService {
  constructor(private readonly dataService: PetDataService) {}

  public savePet(request: ISavePetRequest): Promise<ISavePetResponse> {
    return this.dataService
      .savePet(request)
      .then(res => res as ISavePetResponse);
  }

  public getPets(request: IGetPetsRequest): Promise<IGetPetsResponse> {
    return this.dataService
      .getPets(request)
      .then(res => res as IGetPetsResponse);
  }
}

export interface ISavePetRequest {
  pet: IPetModel;
}

export interface ISavePetResponse {
  successful: boolean;
  message: string;
  pet: IPetModel;
}

export interface IGetPetsRequest {
  size: number;
  example: IPetModel;
}

export interface IGetPetsResponse {
  pets: IPetModel[];
}

export interface IPetModel {
  id: number;
  image: string;
  name: string;
  description: string;
  package: string;
}
