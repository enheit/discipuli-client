import merge from 'webpack-merge';

import { common, dev, prod } from './webpack-config';

const getWebpackConfig = env => {
  return env.prod
    ? merge(common(env.prod), prod)
    : merge(common(env.prod), dev);
};

export default getWebpackConfig;