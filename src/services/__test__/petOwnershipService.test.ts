import * as scope from 'fndi';

import {
  IGetDataResponse,
  ISaveDataRequest,
  ISaveDataResponse
} from '../../data/dataContracts';

import {
  IPetOwnershipDataModel,
  PetOwnershipDataService
} from '../../data/petOwnershipDataService';

import {
  IPetOwnershipModel,
  PetOwnershipService
} from '../petOwnershipService';

import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse
} from '../serviceContracts';

const registration = registry => {
  registry({
    type: PetOwnershipDataService,
    value: {
      getPetOwnerships: jest.fn().mockResolvedValue({
        data: [],
        message: 'Request successful',
        successful: true
      }),
      savePetOwnership: jest.fn().mockResolvedValue({
        data: {},
        message: 'Request successful',
        successful: true
      })
    }
  });

  registry({ type: PetOwnershipService });
};

describe(
  'Given a PetOwnershipService',
  scope(registration, resolve => {
    let sut: PetOwnershipService;
    let petOwnershipDataServiceFake: PetOwnershipDataService;

    beforeAll(() => {
      sut = resolve(PetOwnershipService);
      petOwnershipDataServiceFake = resolve(PetOwnershipDataService);
    });

    describe('When asked to SavePetOwnership', () => {
      let result: ISaveResponse<IPetOwnershipModel>;
      let request: ISaveRequest<IPetOwnershipDataModel>;

      beforeAll(async () => {
        request = {
          data: {
            description: 'string',
            image: 'foo',
            name: 'string',
            package: 'string'
          }
        };

        result = await sut.savePetOwnership(request);
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called PetOwnershipDataService::savePetOwnership with correct request', () => {
        expect(
          petOwnershipDataServiceFake.savePetOwnership
        ).toHaveBeenCalledWith(request);
        expect(
          petOwnershipDataServiceFake.savePetOwnership
        ).toHaveBeenCalledTimes(1);
      });
    });

    describe('When asked to GetPetOwnerships', () => {
      let result: IGetResponse<IPetOwnershipModel>;
      let request: IGetRequest<IPetOwnershipDataModel>;

      beforeAll(async () => {
        request = { size: 1 };

        result = await sut.getPetOwnerships(request);
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called PetOwnershipDataService::savePetOwnership with correct request', () => {
        expect(
          petOwnershipDataServiceFake.getPetOwnerships
        ).toHaveBeenCalledWith(request);
        expect(
          petOwnershipDataServiceFake.getPetOwnerships
        ).toHaveBeenCalledTimes(1);
      });
    });
  })
);
