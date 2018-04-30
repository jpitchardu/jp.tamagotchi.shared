import { promisify } from '../utils/index';

export class PetDataService {
  constructor(private readonly petDataClient) {
    this.petDataClient.savePet = promisify(this.petDataClient.savePet);
    this.petDataClient.getPets = promisify(this.petDataClient.getPets);
  }

  public savePet(request: ISavePetRequest): Promise<ISavePetResponse> {
    return this.petDataClient
      .savePet(request)
      .then(res => res as ISavePetResponse);
  }

  public getPets(request: IGetPetsRequest): Promise<IGetPetsResponse> {
    return this.petDataClient
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
