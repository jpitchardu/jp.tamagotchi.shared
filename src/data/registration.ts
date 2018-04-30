import * as grpc from 'grpc';

import { PetDataService } from './petDataService';
import { PetOwnershipDataService } from './petOwnershipDataService';
import { TransactionDataService } from './transactionDataService';
import { UserDataService } from './userDataService';

function dataProtoPackageSelector(load, selector) {
  return selector(load.jp.tamagotchi.data.services);
}

function protoRegistration(registry) {
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.dataProtoServicesPaths.petDataService;

      return dataProtoPackageSelector(
        grpc.load(
          `${config.protoPath}/${config.dataProtoServicesPaths.petDataService}`
        ),
        protoPackage => protoPackage.pet
      ).PetDataService.service;
    },
    name: 'petDataService'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.dataProtoServicesPaths.petDataService;

      return dataProtoPackageSelector(
        grpc.load(
          `${config.protoPath}/${config.dataProtoServicesPaths.petDataService}`
        ),
        protoPackage => protoPackage.pet
      ).PetDataService.service;
    },
    name: 'petOwnershipDataService'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.dataProtoServicesPaths.petDataService;

      return dataProtoPackageSelector(
        grpc.load(
          `${config.protoPath}/${config.dataProtoServicesPaths.petDataService}`
        ),
        protoPackage => protoPackage.pet
      ).PetDataService.service;
    },
    name: 'transactionDataService'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.dataProtoServicesPaths.petDataService;

      return dataProtoPackageSelector(
        grpc.load(
          `${config.protoPath}/${config.dataProtoServicesPaths.petDataService}`
        ),
        protoPackage => protoPackage.pet
      ).PetDataService.service;
    },
    name: 'userDataService'
  });
}

function serviceRegistration(registry) {
  registry({ type: PetDataService });
  registry({ type: PetOwnershipDataService });
  registry({ type: TransactionDataService });
  registry({ type: UserDataService });
}

export function registration(registry) {
  protoRegistration(registry);
  serviceRegistration(registry);
}
