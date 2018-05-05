import * as bunyan from 'bunyan';
import { Server as GrpcServer } from 'grpc';

import { registration as dataRegistration } from './data/index';
import { Server } from './server';
import {
  IServiceDefinition,
  PetOwnershipService,
  PetService,
  registration as servicesRegistration,
  TransactionService,
  UserService
} from './services/index';

export function registration(env = '') {
  return registry => {
    registry({
      name: 'config',
      value: require(env ? `./config/config.${env}` : './config/config').config
    });

    dataRegistration(registry);
    servicesRegistration(registry);

    registry({
      factory: resolve => bunyan.createLogger({ name: 'SharedBussinesLogger' }),
      name: 'log'
    });
    registry({
      factory: resolve => className => resolve('log').child({ className }),
      name: 'logFactory'
    });

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
        const logFactory = resolve('logFactory');

        return new Server(grpcServer, config, services, logFactory);
      },
      type: Server
    });
  };
}
