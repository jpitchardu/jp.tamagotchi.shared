import { require } from './utils/index';

import { registration as dataRegistration } from './data/index';
import { registration as servicesRegistration } from './services/index';

export function registration(env) {
  return registry => {
    registry({ name: 'config', value: require(`config/config.${env}`) });

    dataRegistration(registry);
    servicesRegistration(registry);
  };
}
