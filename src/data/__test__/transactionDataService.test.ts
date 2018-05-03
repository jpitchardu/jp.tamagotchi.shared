import * as scope from 'fndi';

import { IGetResponse, ISaveResponse } from '../dataContracts';
import {
  ITransactionModel,
  TransactionDataService
} from '../transactionDataService';

const registration = registry => {
  registry({
    name: 'transactionDataClient',
    value: {
      getTransactions: jest.fn().mockReturnValue(
        Promise.resolve<IGetResponse<ITransactionModel>>({
          data: [],
          message: '',
          successful: true
        })
      ),
      saveTransaction: jest.fn().mockImplementation(({ data }) =>
        Promise.resolve<ISaveResponse<ITransactionModel>>({
          data,
          message: 'Transaction Saved',
          successful: true
        })
      )
    }
  });

  registry({ type: TransactionDataService });
};

describe(
  'Given a TransactionDataService',
  scope(registration, resolve => {
    let sut: TransactionDataService;
    let transactionDataClientMock;

    beforeAll(() => {
      sut = resolve(TransactionDataService);
      transactionDataClientMock = resolve('transactionDataClient');
    });

    describe('When asked to saveTransaction', () => {
      let result: ISaveResponse<ITransactionModel>;

      beforeAll(async () => {
        result = await sut.saveTransaction({
          data: {}
        });
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called transactionDataClient::saveTransaction once', () => {
        expect(transactionDataClientMock.saveTransaction).toHaveBeenCalledTimes(
          1
        );
      });
    });

    describe('When asked to getTransactions', () => {
      let result: IGetResponse<ITransactionModel>;

      beforeAll(async () => {
        result = await sut.getTransactions({
          size: 1
        });
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called transactionDataClient::saveTransaction once', () => {
        expect(transactionDataClientMock.getTransactions).toHaveBeenCalledTimes(
          1
        );
      });
    });
  })
);
