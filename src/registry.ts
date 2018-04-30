import { require } from './utils/index';

export function registration(env) {
  return registry => {
    registry({ name: 'config', value: require(`config/config.${env}`) });
  };
}
