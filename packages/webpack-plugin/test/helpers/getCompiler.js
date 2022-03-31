import path from "path";

import webpack from "webpack";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createFsFromVolume, Volume } from "memfs";

export default (fixture, plugins = [], loaderOptions = {}, config = {}) => {
  const fullConfig = {
    mode: "development",
    devtool: config.devtool || false,
    context: path.resolve(__dirname, "../fixtures"),
    entry: path.resolve(__dirname, "../fixtures", fixture),
    output: {
      path: path.resolve(__dirname, "../outputs"),
      filename: "[name].bundle.js",
      chunkFilename: "[name].chunk.js",
      publicPath: "",
    },
    module: {
      rules: [
        {
          test: /\.js$/i,
          use: [
            {
              loader: path.resolve(__dirname, "../../src/cjs.js"),
              options: loaderOptions || {},
            }
          ],
        },
      ],
    },
    plugins,
    ...config,
  };

  const compiler = webpack(fullConfig);

  if (!config.outputFileSystem) {
    compiler.outputFileSystem = createFsFromVolume(new Volume());
  }

  return compiler;
};