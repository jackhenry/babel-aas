import { validate } from "schema-utils";

const schema = {
  type: "object",
  properties: {
    compilation: {
      anyOf: [
        { "type": "object"},
        { "typeof": "undefined"}
      ]
    }
  }
};


export default function babelAASLoader (source) {
  const options = this.getOptions();
  validate(schema, options, {
    name: "BabelAASLoader",
    baseDataPath: "options"
  });
  if (!options.compilation) throw new Error("You must add the BabelAASPlugin to your webpack config.");
  const { resourcePath } = this;
  const { compilation } = options;
  if (!compilation[resourcePath]) {
    // console.error(`Loader failed to find compiled source for ${resourcePath}`);
    return source;
  };

  return compilation[resourcePath];
}