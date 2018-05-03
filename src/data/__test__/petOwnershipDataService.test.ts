import * as scope from 'fndi';

import { IGetResponse, ISaveResponse } from '../dataContracts';
import {
  IPetOwnershipModel,
  PetOwnershipDataService
} from '../petOwnershipDataService';

const registration = registry => {
  registry({
    name: 'petOwnershipDataClient',
    value: {
      getPetOwnerships: jest.fn().mockReturnValue(
        Promise.resolve<IGetResponse<IPetOwnershipModel>>({
          data: [],
          message: '',
          successful: true
        })
      ),
      savePetOwnership: jest.fn().mockImplementation(({ data }) =>
        Promise.resolve<ISaveResponse<IPetOwnershipModel>>({
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
      let result: ISaveResponse<IPetOwnershipModel>;

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
      let result: IGetResponse<IPetOwnershipModel>;

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
