export default (config, env, helpers) => {
  config.output.publicPath = env.isProd ? '/babel-aas/' : '/';
  const service_url = env.isProd ? 'https://baas-gateway-pjrrdkdfpa-uc.a.run.app' : 'http://localhost:9001';
  const definePlugin = helpers.getPluginsByName(config, 'DefinePlugin')[0].plugin;
  definePlugin.definitions['process.env.BAAS_SERVICE_URL'] = JSON.stringify(service_url);
  return config;
};