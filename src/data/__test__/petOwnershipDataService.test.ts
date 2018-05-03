import * as scope from 'fndi';

import { IGetDataResponse, ISaveDataResponse } from '@data/dataContracts';
import {
  IPetOwnershipDataModel,
  PetOwnershipDataService
} from '@data/petOwnershipDataService';

const registration = registry => {
  registry({
    name: 'petOwnershipDataClient',
    value: {
      getPetOwnerships: jest.fn().mockReturnValue(
        Promise.resolve<IGetDataResponse<IPetOwnershipDataModel>>({
          data: [],
          message: '',
          successful: true
        })
      ),
      savePetOwnership: jest.fn().mockImplementation(({ data }) =>
        Promise.resolve<ISaveDataResponse<IPetOwnershipDataModel>>({
          data,
          message: 'Pet Saved',
          successful: true
        })
      )
    }
  });

  registry({ type: PetOwnershipDataService });
};

describe(
  'Given a PetOwnershipDataService',
  scope(registration, resolve => {
    let sut: PetOwnershipDataService;
    let petOwnershipDataClientMock;

    beforeAll(() => {
      sut = resolve(PetOwnershipDataService);
      petOwnershipDataClientMock = resolve('petOwnershipDataClient');
    });

    describe('When asked to savePetOwnership', () => {
      let result: ISaveDataResponse<IPetOwnershipDataModel>;

      beforeAll(async () => {
        result = await sut.savePetOwnership({
          data: {}
        });
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called petOwnershipDataClient::savePetOwnership once', () => {
        expect(
          petOwnershipDataClientMock.savePetOwnership
        ).toHaveBeenCalledTimes(1);
      });
    });

    describe('When asked to getPetOwnerships', () => {
      let result: IGetDataResponse<IPetOwnershipDataModel>;

      beforeAll(async () => {
        result = await sut.getPetOwnerships({
          size: 1
        });
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called petOwnershipDataClient::savePetOwnership once', () => {
        expect(
          petOwnershipDataClientMock.getPetOwnerships
        ).toHaveBeenCalledTimes(1);
      });
    });
  })
);
