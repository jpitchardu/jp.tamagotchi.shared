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
import { PetOwnershipModel, PetOwnershipService } from '../petOwnershipService';
import {
  GetRequest,
  GetResponse,
  SaveRequest,
  SaveResponse
} from '../serviceContracts';

describe('Given a PetOwnershipService', () => {
  const sutRegistration = registry => {
    registry({ type: PetOwnershipService });
  };

  describe('When asked to SavePetOwnership', () => {
    describe('And Request is invalid', () => {
      let sut: PetOwnershipService;
      let validateMock;
      let petOwnershipDataServiceFake: PetOwnershipDataService;

      let request;
      let result;

      const validateRegistration = registry => {
        registry({ name: 'validate', value: jest.fn().mockRejectedValue({}) });
      };

      beforeAll(
        scope(
          registry => {
            sutRegistration(registry),
              validateRegistration(registry),
              registry({ type: PetOwnershipDataService, value: {} });
          },
          async resolve => {
            sut = resolve(PetOwnershipService);

            validateMock = resolve('validate');
            petOwnershipDataServiceFake = resolve(PetOwnershipDataService);

            request = {
              data: {
                description: '',
                image: 'fakeImg.txt',
                name: '',
                package: ''
              }
            };
            result = await sut.savePetOwnership(request);
          }
        )
      );

      test('Result should be unsuccessful', () => {
        expect(result.successful).toBe(false);
      });

      test('It should have called validateFn with the correct request', () => {
        expect(validateMock).toHaveBeenCalledWith(request);
      });
    });

    describe('And Request is valid', () => {
      const validateRegistration = registry => {
        registry({ name: 'validate', value: jest.fn().mockResolvedValue({}) });
      };

      describe('And PetOwnershipDataService::getPetOwnerships runs correctly ', () => {
        let sut: PetOwnershipService;
        let validateMock;
        let petOwnershipDataServiceFake: PetOwnershipDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: PetOwnershipDataService,
            value: {
              savePetOwnership: jest.fn().mockResolvedValue({
                data: {},
                message: 'Request successful',
                successful: true
              })
            }
          });
        };

        beforeAll(
          scope(
            registry => {
              sutRegistration(registry);
              validateRegistration(registry);
              dataServiceRegistration(registry);
            },
            async resolve => {
              sut = resolve(PetOwnershipService);

              validateMock = resolve('validate');
              petOwnershipDataServiceFake = resolve(PetOwnershipDataService);
              request = {
                data: {
                  description: 'string',
                  image: 'foo',
                  name: 'string',
                  package: 'string'
                }
              };
              result = await sut.savePetOwnership(request);
            }
          )
        );
        test('result should be successful', () => {
          expect(result.successful).toBe(true);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
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

      describe('And PetOwnershipDataService::savePetOwnership fails ', () => {
        let sut: PetOwnershipService;
        let validateMock;
        let petOwnershipDataServiceFake: PetOwnershipDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: PetOwnershipDataService,
            value: {
              savePetOwnership: jest.fn().mockRejectedValue({
                data: {},
                message: 'Request unsuccessful',
                successful: false
              })
            }
          });
        };

        beforeAll(
          scope(
            registry => {
              sutRegistration(registry);
              validateRegistration(registry);
              dataServiceRegistration(registry);
            },
            async resolve => {
              sut = resolve(PetOwnershipService);

              validateMock = resolve('validate');
              petOwnershipDataServiceFake = resolve(PetOwnershipDataService);
              request = {
                data: {
                  description: 'string',
                  image: 'foo',
                  name: 'string',
                  package: 'string'
                }
              };
              result = await sut.savePetOwnership(request);
            }
          )
        );

        test('result should be unsuccessful', () => {
          expect(result.successful).toBe(false);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
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
    });
  });

  describe('When asked to GetPetOwnerships', () => {
    describe('And Request is invalid', () => {
      let sut: PetOwnershipService;
      let validateMock;
      let petOwnershipDataServiceFake: PetOwnershipDataService;

      let request;
      let result;
      const validateRegistration = registry => {
        registry({ name: 'validate', value: jest.fn().mockRejectedValue({}) });
      };

      beforeAll(
        scope(
          registry => {
            sutRegistration(registry),
              validateRegistration(registry),
              registry({ type: PetOwnershipDataService, value: {} });
          },
          async resolve => {
            sut = resolve(PetOwnershipService);

            validateMock = resolve('validate');
            petOwnershipDataServiceFake = resolve(PetOwnershipDataService);

            request = { size: 0 };
            result = await sut.getPetOwnerships(request);
          }
        )
      );

      test('Result should be unsuccessful', () => {
        expect(result.successful).toBe(false);
      });

      test('It should have called validateFn with the correct request', () => {
        expect(validateMock).toHaveBeenCalledWith(request);
      });
    });

    describe('And Request is valid', () => {
      const validateRegistration = registry => {
        registry({ name: 'validate', value: jest.fn().mockResolvedValue({}) });
      };

      describe('And PetOwnershipDataService::getPetOwnerships runs correctly ', () => {
        let sut: PetOwnershipService;
        let validateMock;
        let petOwnershipDataServiceFake: PetOwnershipDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: PetOwnershipDataService,
            value: {
              getPetOwnerships: jest
                .fn()
                .mockResolvedValue({ data: [], message: '', successful: true })
            }
          });
        };

        beforeAll(
          scope(
            registry => {
              sutRegistration(registry);
              validateRegistration(registry);
              dataServiceRegistration(registry);
            },
            async resolve => {
              sut = resolve(PetOwnershipService);

              validateMock = resolve('validate');
              petOwnershipDataServiceFake = resolve(PetOwnershipDataService);
              request = { size: 1 };
              result = await sut.getPetOwnerships(request);
            }
          )
        );

        test('result should be successful', () => {
          expect(result.successful).toBe(true);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test('it should have called PetOwnershipDataService::getPetOwnerships with correct request', () => {
          expect(
            petOwnershipDataServiceFake.getPetOwnerships
          ).toHaveBeenCalledWith(request);
          expect(
            petOwnershipDataServiceFake.getPetOwnerships
          ).toHaveBeenCalledTimes(1);
        });
      });
      describe('And PetOwnershipDataService::getPetOwnerships fails ', () => {
        let sut: PetOwnershipService;
        let validateMock;
        let petOwnershipDataServiceFake: PetOwnershipDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: PetOwnershipDataService,
            value: {
              getPetOwnerships: jest.fn().mockRejectedValue({
                data: {},
                message: 'Request unsuccessful',
                successful: false
              })
            }
          });
        };

        beforeAll(
          scope(
            registry => {
              sutRegistration(registry);
              validateRegistration(registry);
              dataServiceRegistration(registry);
            },
            async resolve => {
              sut = resolve(PetOwnershipService);

              validateMock = resolve('validate');
              petOwnershipDataServiceFake = resolve(PetOwnershipDataService);

              request = { size: 1 };

              result = await sut.getPetOwnerships(request);
            }
          )
        );

        test('result should be unsuccessful', () => {
          expect(result.successful).toBe(false);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test('it should have called PetOwnershipDataService::getPetOwnerships with correct request', () => {
          expect(
            petOwnershipDataServiceFake.getPetOwnerships
          ).toHaveBeenCalledWith(request);
          expect(
            petOwnershipDataServiceFake.getPetOwnerships
          ).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
