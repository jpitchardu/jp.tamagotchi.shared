import { promisify } from '../utils/index';

export class PetOwnershipDataService {
  constructor(private readonly petOwnershipDataClient) {
    this.petOwnershipDataClient.savePetOwnership = promisify(
      this.petOwnershipDataClient.savePetOwnership
    );
    this.petOwnershipDataClient.getPetOwnerships = promisify(
      this.petOwnershipDataClient.getPetOwnerships
    );
  }

  public savePetOwnership(
    request: ISavePetOwnershipRequest
  ): Promise<ISavePetOwnershipResponse> {
    return this.petOwnershipDataClient
      .savePetOwnership(request)
      .then(res => res as ISavePetOwnershipResponse);
  }

  public getPetOwnerships(
    request: IGetPetOwnershipsRequest
  ): Promise<IGetPetOwnershipsResponse> {
    return this.petOwnershipDataClient
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
