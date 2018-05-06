import {
  Server as GrpcServer,
  ServerCredentials,
  ServiceDefinition
} from 'grpc';

import { IServiceDefinition } from './services/index';

/**
 * @description Main Server 
 * @author jpichardo
 */
export class Server {
  private server: GrpcServer;
  private logger: any;

  /**
   * @param  {GrpcServer} privategrpcServer
   * @param  {any} privateconfig
   * @param  {Array<IServiceDefinition<any>>} privateservices
   * @param  {(className:string)=>any} logFactory
   */
  constructor(
    private grpcServer: GrpcServer,
    private config: any,
    private services: Array<IServiceDefinition<any>>,
    logFactory: (className: string) => any
  ) {
    // Register services
    this.services.forEach(service =>
      this.grpcServer.addService(service.service, service.implementation)
    );

    // Instantiate logger
    this.logger = logFactory('Server');
  }
  /**
   * @returns {IServerStartResult} result
   */
  public start(): IServerStartResult {
    let result: IServerStartResult;

    const hostAddress = `${this.config.ip}:${this.config.port}`;

    this.logger.info(`Attempting to start server at ${hostAddress}`);

    try {

      // Bind grpcServer to hostAddress 
      this.grpcServer.bind(hostAddress, ServerCredentials.createInsecure());

      // Start grpcServer
      this.grpcServer.start();

      result = { message: 'Server Successfully Started', successful: true };

      this.logger.info(`Server successfully started at ${hostAddress}`);
    } catch (err) {
      this.logger.critical(
        `Failed to start server at ${hostAddress} with error: ${err}`
      );
      result = { message: err, successful: false };
    }

    return result;
  }
}

interface IServerStartResult {
  message: string;
  successful: boolean;
}
