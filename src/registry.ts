import { Server as GrpcServer } from 'grpc';

import { Server } from './server';

import { require } from './utils/index';

import { registration as dataRegistration } from './data/index';
import {
  IServiceDefinition,
  PetOwnershipService,
  PetService,
  registration as servicesRegistration,
  TransactionService,
  UserService
} from './services/index';

export function registration(env) {
  return registry => {
    registry({ name: 'config', value: require(`config/config.${env}`) });

    dataRegistration(registry);
    servicesRegistration(registry);

    registry({
      factory: resolve => {
        const services = [
          {
            implementation: resolve(PetService),
            service: resolve('sharedPetService')
          },
          {
            implementation: resolve(PetOwnershipService),
            service: resolve('sharedPetService')
          },
          {
            implementation: resolve(TransactionService),
            service: resolve('sharedTransactionService')
          },
          {
            implementation: resolve(UserService),
            service: resolve('sharedUserService')
          }
        ];

        const grpcServer = new GrpcServer();

        const config = resolve('config');

        return new Server(grpcServer, config, services);
      },
      type: Server
    });
  };
}
