export interface IConfig {
  dataServer: { ip: string; port: number };
  ip: string;
  port: number;
  protoPath: string;
  protoServicesPaths: {
    engineService: string;
    petOwnershipService: string;
    petService: string;
    transactionService: string;
    userService: string;
  };
  // tslint:disable-next-line:object-literal-sort-keys
  dataProtoServicesPaths: {
    petDataService: string;
    petOwnershipDataService: string;
    transactionDataService: string;
    userDataService: string;
  };
}
