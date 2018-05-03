import * as scope from 'fndi';

import { IGetResponse, ISaveResponse } from '../dataContracts';
import { IPetModel, PetDataService } from '../petDataService';

const registration = registry => {
  registry({
    name: 'petDataClient',
    value: {
      getPets: jest.fn().mockReturnValue(
        Promise.resolve<IGetResponse<IPetModel>>({
          data: [],
          message: '',
          successful: true
        })
      ),
      savePet: jest.fn().mockImplementation(({ data }) =>
        Promise.resolve<ISaveResponse<IPetModel>>({
          data,
          message: 'Pet Saved',
          successful: true
        })
      )
    }
  });

  registry({ type: PetDataService });
};

describe(
  'Given a PetDataService',
  scope(registration, resolve => {
    let sut: PetDataService;
    let petDataClientMock;

    beforeAll(() => {
      sut = resolve(PetDataService);
      petDataClientMock = resolve('petDataClient');
    });

    describe('When asked to savePet', () => {
      let result: ISaveResponse<IPetModel>;

      beforeAll(async () => {
        result = await sut.savePet({
          data: {
            description: 'foo',
            image: 'foo',
            name: 'foo',
            package: 'foo'
          }
        });
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called petDataClient::savePet once', () => {
        expect(petDataClientMock.savePet).toHaveBeenCalledTimes(1);
      });
    });

    describe('When asked to getPets', () => {
      let result: IGetResponse<IPetModel>;

      beforeAll(async () => {
        result = await sut.getPets({
          size: 1
        });
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called petDataClient::savePet once', () => {
        expect(petDataClientMock.getPets).toHaveBeenCalledTimes(1);
      });
    });
  })
);
