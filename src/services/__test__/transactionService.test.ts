import * as scope from 'fndi';

import {
  IGetDataResponse,
  ISaveDataRequest,
  ISaveDataResponse
} from '@data/dataContracts';

import {
  ITransactionDataModel,
  TransactionDataService
} from '@data/transactionDataService';

import { ITransactionModel, TransactionService } from '@services/transactionService';

import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse
} from '@services/serviceContracts';

const registration = registry => {
  registry({
    type: TransactionDataService,
    value: {
      getTransactions: jest.fn().mockResolvedValue({
        data: [],
        message: 'Request successful',
        successful: true
      }),
      saveTransaction: jest.fn().mockResolvedValue({
        data: {},
        message: 'Request successful',
        successful: true
      })
    }
  });

  registry({ type: TransactionService });
};

describe(
  'Given a TransactionService',
  scope(registration, resolve => {
    let sut: TransactionService;
    let transactionDataServiceFake: TransactionDataService;

    beforeAll(() => {
      sut = resolve(TransactionService);
      transactionDataServiceFake = resolve(TransactionDataService);
    });

    describe('When asked to SaveTransaction', () => {
      let result: ISaveResponse<ITransactionModel>;
      let request: ISaveRequest<ITransactionDataModel>;

      beforeAll(async () => {
        request = {
          data: {
            description: 'string',
            image: 'foo',
            name: 'string',
            package: 'string'
          }
        };

        result = await sut.saveTransaction(request);
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called TransactionDataService::saveTransaction with correct request', () => {
        expect(transactionDataServiceFake.saveTransaction).toHaveBeenCalledWith(request);
        expect(transactionDataServiceFake.saveTransaction).toHaveBeenCalledTimes(1);
      });
    });

    describe('When asked to GetTransactions', () => {
      let result: IGetResponse<ITransactionModel>;
      let request: IGetRequest<ITransactionDataModel>;

      beforeAll(async () => {
        request = { size: 1 };

        result = await sut.getTransactions(request);
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called TransactionDataService::saveTransaction with correct request', () => {
        expect(transactionDataServiceFake.getTransactions).toHaveBeenCalledWith(request);
        expect(transactionDataServiceFake.getTransactions).toHaveBeenCalledTimes(1);
      });
    });
  })
);
