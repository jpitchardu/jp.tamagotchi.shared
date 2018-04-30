import { PetOwnershipDataService } from '../data/index';

export class PetOwnershipService {
  constructor(private readonly dataService: PetOwnershipDataService) {}

  public savePetOwnership(
    request: ISavePetOwnershipRequest
  ): Promise<ISavePetOwnershipResponse> {
    return this.dataService
      .savePetOwnership(request)
      .then(res => res as ISavePetOwnershipResponse);
  }

  public getPetOwnerships(
    request: IGetPetOwnershipsRequest
  ): Promise<IGetPetOwnershipsResponse> {
    return this.dataService
      .getPetOwnerships(request)
      .then(res => res as IGetPetOwnershipsResponse);
  }
}

export interface ISavePetOwnershipRequest {
  PetOwnership: IPetOwnershipModel;
}

export interface ISavePetOwnershipResponse {
  successful: boolean;
  message: string;
  PetOwnership: IPetOwnershipModel;
}

export interface IGetPetOwnershipsRequest {
  size: number;
  example: IPetOwnershipModel;
}

export interface IGetPetOwnershipsResponse {
  PetOwnerships: IPetOwnershipModel[];
}

export interface IPetOwnershipModel {
  id: number;
}
