import path from "path";
import { readdirSync, readFileSync, existsSync } from "fs";

import { NormalModule } from "webpack";

import HttpClient from "./httpclient";

class BabelAASPlugin { 
  constructor(options = {}) {
    if (!options.serverUrl) throw new Error("You must supply a baas server url with 'serverUrl' option");
    if (!options.presets) throw new Error("Please supply an array of presets with 'presets' option");
    this.serverUrl = options.serverUrl;
    this.presets = options.presets;
    this.pluginName = "BabelAASPlugin";
    this.sourceDir = options.sourceDir ? path.resolve(options.sourceDir) : null;
    this.sources = {};
  }
  
  /**
   * Generator for recursively reading javascript files in directory
   * @param {string} dir directory to resursively find files
   */
  * getFiles(dir) {
    const dirents = readdirSync(dir, { withFileTypes: true});
    for (const dirent of dirents) {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        yield* this.getFiles(res);
      } else if(this.testPattern.test(dirent.name)) yield res;
    }
  }
  
  /**
   * Attempts to find the root directory for sources.
   * @param {string} context - webpack compiler context path
   * @returns {string} inferred directory path
   */
  static inferSourceDir(context) {
    const possibleSrcDir = path.resolve(context, "src");
    if (existsSync(possibleSrcDir)) return possibleSrcDir;
    
    throw new Error("Unable to infer location of sources. Please supply value for 'sourceDir' plugin option.");
  }
  
  /**
   * Attempt to infer the correct file test pattern from webpack compiler rules.
   * Attempts to find rule where @babel-aas/webpack-plugin is declared as loader
   * @param {Object[]} rules webpack compiler rules
   * @returns regex file test pattern defined in user webpack config.
   * If it can't be inferred, the default pattern is returned.
   * Default pattern: `/\.(jsx?)$/i`
   */
  static inferFileTestPattern(rules) {
    const DEFAULT_FILE_TEST_PATTERN = /\.(jsx?)$/i;
    let fileTestPattern = DEFAULT_FILE_TEST_PATTERN;
    rules.forEach(rule => {
      if (rule.use && rule.use === "@babel-aas/webpack-plugin") {
        if (rule.test) fileTestPattern = rule.test;
      }
    });
    return fileTestPattern;
  }
  
  apply(compiler) {
    const {pluginName} = this;
    const {rules} = compiler.options.module;
    this.testPattern = BabelAASPlugin.inferFileTestPattern(rules);
    // If source directory wasn't supplied as an option, attempt to infer directory of source files
    this.sourceDir = this.sourceDir || BabelAASPlugin.inferSourceDir(compiler.context);
    this.sourceDirectory = path.resolve(this.sourceDir, "");
    for (const file of this.getFiles(this.sourceDirectory)) {
      const source = readFileSync(file, { encoding: "utf-8"});
      this.sources[file] = source;
    }

    compiler.hooks.beforeCompile.tapAsync(pluginName, async (compilation, callback) => {
      const jsonBody = {
        sources: this.sources,
        presets: this.presets
      };
      const response = await HttpClient.post(this.serverUrl, jsonBody);
      this.sources = response.results;
      callback();
    });

    compiler.hooks.compilation.tap(pluginName, com => {
      const {loader} = NormalModule.getCompilationHooks(com);
      loader.tap(pluginName, (loaderContext, module) => {
        const [baasLoader] = module.loaders;
        baasLoader.options = {
          compilation: this.sources,
          ...baasLoader.options
        };
      });
    });
  }
}

export default BabelAASPlugin;