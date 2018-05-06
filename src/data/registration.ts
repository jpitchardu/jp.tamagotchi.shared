import * as grpc from 'grpc';

import { PetDataService } from './petDataService';
import { PetOwnershipDataService } from './petOwnershipDataService';
import { TransactionDataService } from './transactionDataService';
import { UserDataService } from './userDataService';

import { promisify } from '@utils/index';

/**
 * @param  {} load
 * @param  {} selector
 * @description helper function to avoid repeating package selection
 */
function dataProtoPackageSelector(load, selector) {
  return selector(load.jp.tamagotchi.data.services);
}
/**
 * @param  {} pathSelector
 * @param  {} packageSelector
 * @description helper function to avoid repeating config proto resolving logic
 */
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

/**
 * @param  {} registry
 * @description regisration for proto services
 */
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
/**
 * @param  {} registry
 * @description registration for data services
 */
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
/**
 * @param  {} registry
 * @description registration for full data module
 */
export function registration(registry) {
  protoRegistration(registry);
  serviceRegistration(registry);
}
