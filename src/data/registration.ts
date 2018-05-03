import * as grpc from 'grpc';

import { PetDataService } from './petDataService';
import { PetOwnershipDataService } from './petOwnershipDataService';
import { TransactionDataService } from './transactionDataService';
import { UserDataService } from './userDataService';

import { promisify } from '@utils/index';

function dataProtoPackageSelector(load, selector) {
  return selector(load.jp.tamagotchi.data.services);
}

function protoResolverFactory(pathSelector, packageSelector) {
  return config => {
    const dataServer = config.dataServer;
    const path = pathSelector(config);

    const clientType = dataProtoPackageSelector(
      grpc.load(`${config.protoPath}/${path}`),
      packageSelector
    ).PetDataService;

    return new clientType(
      `${dataServer.ip}:${dataServer.port}`,
      grpc.credentials.createInsecure()
    );
  };
}

function protoRegistration(registry) {
  registry({
    factory: resolve => {
      const instance = protoResolverFactory(
        config => config.dataProtoServicesPaths.petDataService,
        protoPackage => protoPackage.pet
      )(resolve('config'));

      instance.savePet = promisify(instance.savePet);
      instance.getPets = promisify(instance.getPets);
    },
    name: 'petDataClient'
  });
  registry({
    factory: resolve => {
      const instance = protoResolverFactory(
        config => config.dataProtoServicesPaths.petOwnershipDataService,
        protoPackage => protoPackage.petOwnership
      )(resolve('config'));

      instance.savePetOwnership = promisify(instance.savePetOwnership);
      instance.getPetOwnerships = promisify(instance.getPetOwnerships);
    },
    name: 'petOwnershipDataClient'
  });
  registry({
    factory: resolve => {
      const instance = protoResolverFactory(
        config => config.dataProtoServicesPaths.transactionDataService,
        protoPackage => protoPackage.transaction
      )(resolve('config'));

      instance.saveTransaction = promisify(instance.saveTransaction);
      instance.getTransactions = promisify(instance.getTransactions);
    },
    name: 'transactionDataClient'
  });
  registry({
    factory: resolve => {
      const instance = protoResolverFactory(
        config => config.dataProtoServicesPaths.userDataService,
        protoPackage => protoPackage.user
      )(resolve('config'));

      instance.saveUser = promisify(instance.saveUser);
      instance.getUsers = promisify(instance.getUsers);
    },
    name: 'userDataClient'
  });
}

function serviceRegistration(registry) {
  registry({
    type: PetDataService
  });
  registry({
    type: PetOwnershipDataService
  });
  registry({
    type: TransactionDataService
  });
  registry({
    type: UserDataService
  });
}

export function registration(registry) {
  protoRegistration(registry);
  serviceRegistration(registry);
}
