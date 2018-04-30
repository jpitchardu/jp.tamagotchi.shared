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

      const dataServer = config.dataServer;
      const path = config.dataProtoServicesPaths.petDataService;

      const clientType = dataProtoPackageSelector(
        grpc.load(
          `${config.protoPath}/${config.dataProtoServicesPaths.petDataService}`
        ),
        protoPackage => protoPackage.pet
      ).PetDataService;

      return new clientType(
        `${dataServer.ip}:${dataServer.port}`,
        grpc.credentials.createInsecure()
      );
    },
    name: 'petDataClient'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const dataServer = config.dataServer;
      const path = config.dataProtoServicesPaths.petDataService;

      const clientType = dataProtoPackageSelector(
        grpc.load(
          `${config.protoPath}/${config.dataProtoServicesPaths.petDataService}`
        ),
        protoPackage => protoPackage.pet
      ).PetDataService;

      return new clientType(
        `${dataServer.ip}:${dataServer.port}`,
        grpc.credentials.createInsecure()
      );
    },
    name: 'petOwnershipDataClient'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const dataServer = config.dataServer;
      const path = config.dataProtoServicesPaths.petDataService;

      const clientType = dataProtoPackageSelector(
        grpc.load(
          `${config.protoPath}/${config.dataProtoServicesPaths.petDataService}`
        ),
        protoPackage => protoPackage.pet
      ).PetDataService;

      return new clientType(
        `${dataServer.ip}:${dataServer.port}`,
        grpc.credentials.createInsecure()
      );
    },
    name: 'transactionDataClient'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const dataServer = config.dataServer;
      const path = config.dataProtoServicesPaths.petDataService;

      const clientType = dataProtoPackageSelector(
        grpc.load(
          `${config.protoPath}/${config.dataProtoServicesPaths.petDataService}`
        ),
        protoPackage => protoPackage.pet
      ).PetDataService;

      return new clientType(
        `${dataServer.ip}:${dataServer.port}`,
        grpc.credentials.createInsecure()
      );
    },
    name: 'userDataClient'
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
