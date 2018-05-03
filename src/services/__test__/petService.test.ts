import * as scope from 'fndi';

import {
  IGetDataResponse,
  ISaveDataRequest,
  ISaveDataResponse
} from '@data/dataContracts';

import { IPetDataModel, PetDataService } from '@data/petDataService';

import { IPetModel, PetService } from '@services/petService';

import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse
} from '@services/serviceContracts';

const registration = registry => {
  registry({
    type: PetDataService,
    value: {
      getPets: jest.fn().mockResolvedValue({
        data: [],
        message: 'Request successful',
        successful: true
      }),
      savePet: jest.fn().mockResolvedValue({
        data: {},
        message: 'Request successful',
        successful: true
      })
    }
  });

  registry({ type: PetService });
};

describe(
  'Given a PetService',
  scope(registration, resolve => {
    let sut: PetService;
    let petDataServiceFake: PetDataService;

    beforeAll(() => {
      sut = resolve(PetService);
      petDataServiceFake = resolve(PetDataService);
    });

    describe('When asked to SavePet', () => {
      let result: ISaveResponse<IPetModel>;
      let request: ISaveRequest<IPetDataModel>;

      beforeAll(async () => {
        request = {
          data: {
            description: 'string',
            image: 'foo',
            name: 'string',
            package: 'string'
          }
        };

        result = await sut.savePet(request);
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called PetDataService::savePet with correct request', () => {
        expect(petDataServiceFake.savePet).toHaveBeenCalledWith(request);
        expect(petDataServiceFake.savePet).toHaveBeenCalledTimes(1);
      });
    });

    describe('When asked to GetPets', () => {
      let result: IGetResponse<IPetModel>;
      let request: IGetRequest<IPetDataModel>;

      beforeAll(async () => {
        request = { size: 1 };

        result = await sut.getPets(request);
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called PetDataService::savePet with correct request', () => {
        expect(petDataServiceFake.getPets).toHaveBeenCalledWith(request);
        expect(petDataServiceFake.getPets).toHaveBeenCalledTimes(1);
      });
    });
  })
);
