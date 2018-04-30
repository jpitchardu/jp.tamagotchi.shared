import * as grpc from 'grpc';

function dataProtoPackageSelector(load, selector) {
  return selector(load.jp.tamagotchi.data.services);
}

export function registration(registry) {
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
